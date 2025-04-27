import { defineConfig } from "tsdown/config";

export default defineConfig({
	entry: {
		index: "entries/index.ts",
		prefixed: "entries/prefixed.ts",
	},
	format: ["cjs", "esm"],
	outDir: "dist",
	dts: true,
	sourcemap: true,
	clean: true,
});
