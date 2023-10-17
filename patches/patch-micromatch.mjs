import {readFile, writeFile} from "node:fs/promises";
import {existsSync} from "fs";

const paths = [
	"./node_modules/@deepkit/type-compiler/dist/esm/src/compiler.js",
	"./node_modules/@deepkit/vite/node_modules/@deepkit/type-compiler/dist/esm/src/compiler.js"
]

console.log("==== Micromatch patcher ====")

for (const path of paths) {
	if (!existsSync(path)) {
		continue;
	}

	const search = "import * as micromatch from 'micromatch';";
	const replaceWith = "import micromatch from 'micromatch';";

	let didPatch = false;

	const micromatchEsmInitial = await readFile(path, "utf-8");

	if (micromatchEsmInitial.includes(search)) {
		const patched = micromatchEsmInitial.replace(search, replaceWith)
		didPatch = true;
		await writeFile(path, patched);

		const micromatchEsmAfter = await readFile(path, "utf-8");

		if (micromatchEsmInitial !== micromatchEsmAfter) {
			console.log("patched: " + path)
		}
	}

	console.log(`> ${didPatch ? "PATCHED" : "NO PATCH"} : ${path}`);
}
