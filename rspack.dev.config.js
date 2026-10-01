import { defineConfig } from "@rspack/cli";
import rspack from "@rspack/core";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import pkg from "./package.json" with { type: "json" };
import { fileURLToPath } from "node:url";

export default defineConfig({
	resolve: {
		alias: {
			"@nsnanocat/util": fileURLToPath(new URL("./src/vendor/util/index.js", import.meta.url)),
			"@nsnanocat/url": fileURLToPath(new URL("./src/vendor/url/URL.mjs", import.meta.url)),
		},
	},
	entry: {
		"Composite.Subtitles.response": "./src/Composite.Subtitles.response.dev.js",
		"External.Lyrics.response": "./src/External.Lyrics.response.dev.js",
		"Manifest.response": "./src/Manifest.response.dev.js",
		"Translate.response": "./src/Translate.response.dev.js",
	},
	output: {
		chunkFormat: false,
		filename: "[name].bundle.js",
		library: {
			type: "module",
		},
	},
	optimization: {
		minimize: false,
		usedExports: true,
	},
	plugins: [
		new NodePolyfillPlugin({
			//additionalAliases: ['console'],
		}),
		new rspack.BannerPlugin({
			banner: `console.log('Date: ${new Date().toLocaleString("zh-CN", { timeZone: "PRC" })}');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: `console.log('Version: ${pkg.version}');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: "console.log('[file]');",
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: `console.log('${pkg.displayName} β');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: pkg.homepage,
		}),
	],
	devtool: false,
	performance: false,
});
