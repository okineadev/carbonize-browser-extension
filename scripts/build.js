import esbuild from "esbuild";
import config from "./esbuild.config.js";
import fs from "node:fs";
import path from "node:path";

const baseDistDir = path.join(process.cwd(), 'dist');
const distDir = path.join(baseDistDir, 'chrome-extension');

if (fs.existsSync(baseDistDir)) {
  try {
    fs.rmSync(baseDistDir, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting ${distDir}.`, err);
  }
}

// Створення папки dist
fs.mkdirSync(baseDistDir, { recursive: true });

// Копіювання файлу manifest.json у папку dist
const srcManifest = path.join(process.cwd(), "src", "manifest.json");
const destManifest = path.join(distDir, "manifest.json");

// fs.copyFile(srcManifest, destManifest, (err) => {
// 	if (err) {
// 		return console.error(`Error copying manifest.json: ${err.message}`);
// 	}
// });

fs.readFile(srcManifest, "utf8", (err, data) => {
	if (err) {
		return console.error(`Error reading manifest.json: ${err.message}`);
	}

	try {
		const minifiedManifest = JSON.stringify(JSON.parse(data));
		fs.writeFile(destManifest, minifiedManifest, (err) => {
			if (err) {
				return console.error(
					`Error writing minified manifest.json: ${err.message}`,
				);
			}
		});
	} catch (parseErr) {
		console.error(`Error parsing manifest.json: ${parseErr.message}`);
	}
});

const srcImages = path.join(process.cwd(), "src", "images");
const destImages = path.join(distDir, "images");

fs.cp(srcImages, destImages, { recursive: true }, (err) => {
	if (err) {
		return console.error(`Error copying image.png: ${err.message}`);
	}
});

// Запуск збірки з esbuild
esbuild
	.build(config)
	.then(() => {
		console.log("Build completed successfully!");
	})
	.catch((err) => {
		console.error("Build failed:", err);
		process.exit(1);
	});
