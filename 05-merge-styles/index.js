const fs = require("node:fs");
const path = require("node:path");
const dirPath = path.join(__dirname, "styles");
const bundlePath = path.join(__dirname, "project-dist", "bundle.css");

async function bundleFiles() {
    try {
        await fs.promises.writeFile(bundlePath, "");
        const files = await fs.promises.readdir(dirPath, {encoding: "utf-8"});
        for (const file of files) {
            if (file.split(".")[1] === "css") {
                const fileContent = await fs.promises.readFile(`${dirPath}/${file}`, "utf-8");
                await fs.promises.appendFile(bundlePath, fileContent);
            }
        }
    } catch (err) {
        console.error(err.message);
    }
}

bundleFiles();