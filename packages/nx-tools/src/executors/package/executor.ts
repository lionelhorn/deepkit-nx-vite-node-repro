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
	const tarRelPath = "../../tars";

	const allPackageJsonPathsFromDist = await glob('dist/**/package.json', {ignore: 'node_modules/**'})

	// Package all packages from /dist
	for (const distPackagePath of allPackageJsonPathsFromDist) {
		process.chdir(repoRootPath);

		const distPackage = readJsonFile(distPackagePath)

		/**
		 *  Find deps from current project and package it as tarball
		 * 	for instance current project (like app) from executor has @scope/... dep (like @scope/utils)
		 */
		if (peerDeps.hasOwnProperty(distPackage.name)) {
			const dir = dirname(distPackagePath);
			process.chdir(dir);

			// ESM import from NX executor bypass
			// https://github.com/nrwl/nx/issues/15682#issuecomment-1700298264
			const execa =
				await (Function('return import("execa")')() as Promise<
					typeof import('execa')
				>);

			const args = [tarRelPath];
			const {stdout: tarballPath} = await execa.$`pnpm pack --pack-destination ${args}`;
			console.log(`Packaging ${distPackage.name} as ${tarballPath}`);
		}
	}

	return {
		success: true,
	}
}