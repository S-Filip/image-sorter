const fs = require("fs");
const path = require("path");
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });
// absolute directory path
console.log("> Enter the directory path (right click to paste):");
readline.prompt();
readline.on("line", (directory) => {
  console.log(`\nReading directory: ${directory}`);
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      readline.close();
      return;
    }
    console.log(`Found ${files.length} files`);
    const imageFiles = files.filter((file) => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp") || file.endsWith(".gif") || file.endsWith(".jpeg"));
    console.log(`Found ${imageFiles.length} image files`);
    // counter to check whether all files have been processed
    let counter = 0;
    imageFiles.forEach((file, index) => {
      const fileExtension = path.extname(file);
      const newFileName = `image-${String(index + 1).padStart(3, "0")}${fileExtension}`;
      console.log(`Renaming ${file} to ${newFileName}`);
      counter++;
      if (counter === imageFiles.length) {
        readline.question("\nPress Enter to exit...", () => {
          readline.close();
        });
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
