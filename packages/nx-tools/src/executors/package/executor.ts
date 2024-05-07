import type {ExecutorContext} from '@nx/devkit';
import {resolve, dirname, relative} from "path";
import {readJsonFile, writeJsonFile} from "@nx/devkit";
import {glob} from "glob";
import {getPackageJsonHelperModule} from "../../utils";
import {PackagerExecutorSchema} from "./schema";
import {mkdir, cp} from "node:fs/promises"

// Cannot import esm only package as nx doesn't support ESM in local executors.
// import {Package} from "package-json-helper";
// See workaround example below for execa

export default async function buildExecutor(
	options: PackagerExecutorSchema,
	context: ExecutorContext
) {
	// Prepare
	const packageJsonHelper = await getPackageJsonHelperModule()
	const repoRootPath = process.cwd()
	const projectDistDir = options.outputPath;

	/**
	 * Copy project to packaging dir
	 */
		// Make directory structure needed for packaging app
	const projectPackagingDir = options.packagerOutputPath;
	await mkdir(projectPackagingDir, {recursive: true})

	// Copy project to packaging dir
	await cp(projectDistDir, projectPackagingDir, {recursive: true})

	// Get project package details
	const projectDistPackagePath = resolve(projectDistDir, "package.json");
	const projectPackage = new packageJsonHelper.Package(projectDistPackagePath);
	await projectPackage.read();

	// Get packaged package json
	const projectPackagedPackagePath = resolve(projectPackagingDir, "package.json");
	const projectPackagedPackageAsObj = await readJsonFile(projectPackagedPackagePath);

	// Get root repo package json
	const repoPackagePath = resolve("package.json");
	const repoPackageAsObj = await readJsonFile(repoPackagePath);

	/**
	 * Copy deps of project
	 */
		// Get all packages in dist
	const allPackageJsonPathsFromDist = await glob('dist/**/package.json', {ignore: ['node_modules/**', 'tars/**']})
	const allPackages = new Map<string, { path: string, packageInfos: packageJsonHelper.Package }>();
	for (const packagePath of allPackageJsonPathsFromDist) {
		const p = new packageJsonHelper.Package(packagePath);
		await p.read();
		allPackages.set(p.name, {path: packagePath, packageInfos: p});
	}

	// Copy peerdeps of project to packaging dir
	for (const [peerDepName, dep] of projectPackage.peerDependencies) {
		if(!peerDepName.startsWith("@lionel")) {
			continue;
		}


		// like /packaged/deps/@lionelhorn/utils
		const peerDepCopyDistDirPath = `${projectPackagingDir}/deps/${peerDepName}/`
		await mkdir(peerDepCopyDistDirPath, {recursive: true})

		const {path, packageInfos} = allPackages.get(peerDepName);
		console.log(`Copying ${peerDepName} to ${peerDepCopyDistDirPath}`);

		// like dist\packages\utils ==> packaged/apps/deepkit-app/deps/@lionelhorn/utils
		await cp(dirname(path), peerDepCopyDistDirPath, {recursive: true})

		// Adjust project package.json to link to local copy of dep
		console.log(projectPackagedPackageAsObj);
		console.log(projectPackagedPackageAsObj.peerDependencies[peerDepName]);
		projectPackagedPackageAsObj.peerDependencies[peerDepName] = `file://.\\deps\\${peerDepName}`;
	}

	// Add patches from repo that may also be needed for packaged app
	const patches = repoPackageAsObj?.pnpm?.patchedDependencies;
	projectPackagedPackageAsObj["pnpm"] =  repoPackageAsObj?.pnpm;
	await mkdir( resolve(projectPackagingDir, "patches"), {recursive: true})
	await cp(resolve(repoRootPath, "patches"), resolve(projectPackagingDir, "patches"), {recursive: true})

	// Write project package with locally linked deps
	writeJsonFile(projectPackagedPackagePath, projectPackagedPackageAsObj);

	return {
		success: true,
	}
}
