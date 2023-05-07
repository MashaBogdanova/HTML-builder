const process = require('node:process');
const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "text.txt");

fs.writeFile(filePath, "", err => {
    if (err) {
        throw err;
    }
    stdout.write("Может ли всемогущее существо создать камень, который оно само не сможет поднять?\n");
    stdin.on("data", data => {
        if (data.toString() === "exit\n") {
            stdout.write("\nУдачи!\n");
            process.exit();
        }
        fs.appendFile(filePath, `${data}`, err => {
            if (err) {
                throw err;
            }
        })
    })
});

process.on('SIGINT', () => {
    stdout.write("\nУдачи!\n");
    process.exit();
});
