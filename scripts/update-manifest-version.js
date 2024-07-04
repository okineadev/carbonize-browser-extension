import * as path from "node:path";
import * as fs from "node:fs";

const packageJsonPath = path.resolve("package.json");
const manifestPath = path.resolve("src", "manifest.json");

const packageJsonData = fs.readFileSync(packageJsonPath, {
    encoding: "utf8",
});
const packageJson = JSON.parse(packageJsonData);

const manifestData = fs.readFileSync(manifestPath, {
    encoding: "utf8",
});
const manifest = JSON.parse(manifestData);

const updatedManifest = {
    ...manifest,
    version: packageJson.version,
};
const updatedManifestStr = `${JSON.stringify(updatedManifest, null, 2)}\n`;

fs.writeFileSync(manifestPath, updatedManifestStr);
console.log(`Updated manifest.json version to ${packageJson.version}`);