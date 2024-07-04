import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.join(process.cwd(), "package.json");

fs.readFile(packageJsonPath, "utf8", (err, data) => {
    if (err) {
        console.error(`Error reading package.json: ${err.message}`);
        process.exit(1);
    }

    try {
        const packageJson = JSON.parse(data);
        console.log(packageJson.version);
    } catch (parseErr) {
        console.error(`Error parsing package.json: ${parseErr.message}`);
        process.exit(1);
    }
});
