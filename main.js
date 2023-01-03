const fs = require("fs");
const path = require("path");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Enter the directory path:");

readline.prompt();

// ask the user to enter the directory path
readline.on("line", (directory) => {
  console.log(`Reading directory: ${directory}`);

  // get a list of all the files in the directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      readline.close();
      return;
    }

    console.log(`Found ${files.length} files`);

    // filter the list of files to only include image files
    const imageFiles = files.filter((file) => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp") || file.endsWith(".gif") || file.endsWith(".jpeg"));

    console.log(`Found ${imageFiles.length} image files`);

    // loop through the list of image files and rename them
    imageFiles.forEach((file, index) => {
      // determine the file extension of the original file
      const fileExtension = path.extname(file);

      // construct the new file name in the format "image-001.jpg" or "image-001.png"
      const newFileName = `image-${String(index + 1).padStart(3, "0")}${fileExtension}`;

      console.log(`Renaming ${file} to ${newFileName}`);

      // rename the file
      fs.rename(path.join(directory, file), path.join(directory, newFileName), (err) => {
        if (err) {
          console.error(`Error renaming file: ${err}`);
        }
      });
    });
  });

  readline.close();
});
