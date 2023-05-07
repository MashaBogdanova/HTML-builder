const fs = require("node:fs");
const path = require("node:path");
const htmlTemplatePath = path.join(__dirname, "template.html");
const indexHtmlPath = path.join(__dirname, "project-dist", "index.html")
const componentsFolderPath = path.join(__dirname, "components");
const distFolderPath = path.join(__dirname, "project-dist");
const stylesFolderPath = path.join(__dirname, "styles");
const cssBundlePath = path.join(__dirname, "project-dist", "style.css")
const assetsFolderPath = path.join(__dirname, "assets");
const assetsCopyFolderPath = path.join(__dirname, "project-dist", "assets");

async function buildPage() {
    try {
        // Create project-dist folder and file structure inside it
        const htmlDraft = await fs.promises.readFile(htmlTemplatePath, "utf-8");
        await fs.promises.mkdir(distFolderPath, {recursive: true});
        await fs.promises.mkdir(assetsCopyFolderPath, {recursive: true});
        await fs.promises.writeFile(indexHtmlPath, htmlDraft);
        await fs.promises.writeFile(cssBundlePath, "");

        // Replace HTML tags with corresponding content
        const componentsFiles = await fs.promises.readdir(componentsFolderPath);
        let resultContent = htmlDraft;

        for (const fileName of componentsFiles) {
            const componentName = path.parse(fileName).name;
            const component = await fs.promises.readFile(path.join(componentsFolderPath, fileName));
            const regex = new RegExp(`{{${componentName}}}`, 'g');
            resultContent = resultContent.replace(regex, component);
        }
        await fs.promises.writeFile(indexHtmlPath, resultContent);

        // Copy assets
        const assets = await fs.promises.readdir(assetsFolderPath, "utf-8");
        for (const folder of assets) {
            await fs.promises.mkdir(`${assetsCopyFolderPath}/${folder}`, {recursive: true});
            const files = await fs.promises.readdir(`${assetsFolderPath}/${folder}`);
            for (const file of files) {
                const fileToCopy = await fs.promises.readFile(`${assetsFolderPath}/${folder}/${file}`);
                await fs.promises.writeFile(`${assetsCopyFolderPath}/${folder}/${file}`, fileToCopy);
            }
        }

        // Create css bundle
        const styles = await fs.promises.readdir(stylesFolderPath, {encoding: "utf-8"});
        for (const file of styles) {
            if (file.split(".")[1] === "css") {
                const fileContent = await fs.promises.readFile(`${stylesFolderPath}/${file}`, "utf-8");
                await fs.promises.appendFile(cssBundlePath, fileContent);
            }
        }
    } catch
        (err) {
        console.error(err.message);
    }
}

buildPage();