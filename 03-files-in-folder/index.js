const {stdout} = process;
const path = require("node:path");
const fs = require("node:fs");
const filePath = path.join(__dirname, "secret-folder");

async function readFiles() {
    try {
        const files = await fs.promises.readdir(filePath, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()) {
                fs.stat(`${filePath}/${file.name}`, (err, stats) => {
                    const size = stats.size / 1024;
                    stdout.write(`${file.name.split(".").join("-")}-${size}kb\n`);
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
}

readFiles();