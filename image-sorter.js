const fs = require("fs");
const path = require("path");
const readline = require("readline");

const directoryReadline = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("> Enter the directory path (right click to paste):");
directoryReadline.prompt();

directoryReadline.on("line", (directory) => {
  console.log(`\nReading directory: ${directory}`);

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      directoryReadline.close();
      return;
    } else {
      directoryReadline.close();
    }

    console.log(`Found ${files.length} files`);

    const imageFiles = files.filter((file) => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp") || file.endsWith(".gif") || file.endsWith(".jpeg"));

    console.log(`Found ${imageFiles.length} image files`);

    const namingSchemeReadline = readline.createInterface({ input: process.stdin, output: process.stdout });

    console.log("> Enter the naming scheme:");
    namingSchemeReadline.prompt();

    namingSchemeReadline.on("line", (namingScheme) => {
      console.log(`Using naming scheme: ${namingScheme}`);

      let counter = 0;

      imageFiles.forEach((file, index) => {
        const fileExtension = path.extname(file);
        const newFileName = `${namingScheme}-${String(index + 1).padStart(3, "0")}${fileExtension}`;
        console.log(`Renaming ${file} to ${newFileName}`);
        counter++;
        if (counter === imageFiles.length) {
          namingSchemeReadline.question("\nPress Enter to exit...", () => {});
          namingSchemeReadline.close();
        }
        fs.rename(path.join(directory, file), path.join(directory, newFileName), (err) => {
          if (err) {
            console.error(`Error renaming file: ${err}`);
            counter++;
          }
        });
      });
    });
  });
});
