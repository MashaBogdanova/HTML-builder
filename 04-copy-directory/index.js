const fs = require("node:fs");
const path = require("node:path");
const filesPath = path.join(__dirname, "files");
const filesCopyPath = path.join(__dirname, "files-copy");

async function copyDir() {
    try {
        if (await fs.promises.stat(filesCopyPath)) {
            await fs.promises.rm(filesCopyPath, { recursive: true });
        }
    } catch (err) {}

    try {
        await fs.promises.mkdir(filesCopyPath, {recursive: false});
        const files = await fs.promises.readdir(filesPath, "utf-8");
        for (const file of files) {
            await fs.promises.copyFile(`${filesPath}/${file}`, `${filesCopyPath}/${file}`);
        }
    } catch (err) {
        console.error(err.message);
    }
}

copyDir();