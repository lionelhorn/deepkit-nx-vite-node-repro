import type {ExecutorContext} from '@nx/devkit';
import {resolve, dirname} from "path";
import {readJsonFile} from "@nx/devkit";
import {glob} from "glob";

// Cannot import esm only package as nx doesn't support ESM in local executors.
// import {Package} from "package-json-helper";
// See workaround example below for execa

export default async function buildExecutor(
	options: any,
	context: ExecutorContext
) {
	const repoRootPath = process.cwd()
	const projectDistDir = options.outputPath;
	const disPackageJsonPath = resolve(projectDistDir, "package.json");
	const distPackage = readJsonFile(disPackageJsonPath);
	const peerDeps = distPackage.peerDependencies;
	const tarRelPath = resolve(repoRootPath, "dist/tars")
	const allPackageJsonPathsFromDist = await glob('dist/**/package.json', {ignore: 'node_modules/**'})
	const installLogs = new Map<string, string>();

	for (const distPackagePath of allPackageJsonPathsFromDist) {
		process.chdir(repoRootPath);
		const distPackage = readJsonFile(distPackagePath)

		/**
		 *  Install deps from tarball
		 * 	for instance current project (like app) from executor has @scope/... dep (like @scope/utils)
		 */
		if (peerDeps.hasOwnProperty(distPackage.name)) {
			process.chdir(projectDistDir);
			const tarballFilename = distPackage.name.replaceAll("@", "").replaceAll("/", "-") + `-${distPackage.version}.tgz`;
			const tarballAbsPath = resolve(tarRelPath, tarballFilename);

			// ESM import from NX executor bypass
			// https://github.com/nrwl/nx/issues/15682#issuecomment-1700298264
			const execa =
				await (Function('return import("execa")')() as Promise<
					typeof import('execa')
				>);

			const args = [tarballAbsPath];
			const {stdout: pnpmAddOutput} = await execa.$`pnpm add ${args}`;
			installLogs.set(distPackage.name, pnpmAddOutput);
		}
	}

	console.log("Deps and tarballs", Array.from(installLogs));

	return {
		success: true,
	}
}
