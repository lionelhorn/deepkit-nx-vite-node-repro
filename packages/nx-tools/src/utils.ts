
export async function getExeca() {
	const execa =
		await (Function('return import("execa")')() as Promise<
			typeof import('execa')
		>);

	return execa;
}


export async function getPackageJsonHelperModule() {
	// import {Package} from "package-json-helper";

	const p =
		await (Function('return import("package-json-helper")')() as Promise<
			typeof import('package-json-helper')
		>);

	return p;
}