import type { BuildOptions } from "esbuild";

const config: BuildOptions = {
    entryPoints: ["./src/*.ts"],
    bundle: true,
    minify: true,
    target: "chrome87",
    outdir: "./dist/chrome-extension",
};

export default config;
