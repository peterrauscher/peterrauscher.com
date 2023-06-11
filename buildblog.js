const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");
const showdown = require("showdown");
const converter = new showdown.Converter();

const MARKDOWN_DIRECTORY = path.join(__dirname, "posts");
const OUTPUT_FILE = path.join(__dirname, "posts.json");
const OUTPUT_DIRECTORY = path.join(__dirname, "posts/dist");

let files = [];
try {
  try {
    files = fs
      .readdirSync(MARKDOWN_DIRECTORY)
      .map((f) => path.join(MARKDOWN_DIRECTORY, f))
      .filter((f) => fs.lstatSync(f).isFile())
      .map((file) => {
        try {
          let fileContent = fs.readFileSync(file).toString();
          let post = matter(fileContent);
          post.filename = file;
          console.log(`Found ${path.basename(post.filename)}`);
          post.content = converter.makeHtml(post.content);
          return post;
        } catch (fileError) {
          throw new Error(`Error processing ${file} - ${fileError.message}`);
        }
      });
  } catch (readError) {
    throw new Error(
      `Error reading ${MARKDOWN_DIRECTORY} - ${readError.message}`
    );
  }

  try {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(files));
  } catch (outputError) {
    throw new Error(`Error writing ${OUTPUT_FILE} - ${outputError.message}`);
  }
  if (!files) console.warn(`No markdown files in ${MARKDOWN_DIRECTORY}`);
  files.forEach((file) => {
    try {
      let filename =
        path.join(OUTPUT_DIRECTORY, path.basename(file.filename, ".md")) +
        ".html";
      fs.writeFileSync(filename, file.content);
      console.log(`Rendered ${path.basename(filename)}`);
    } catch (renderError) {
      throw new Error(
        `Error rendering file: ${file.filename || "unknown"} - ${
          renderError.message
        }`
      );
    }
  });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
console.log(`Rendered ${files.length} files`);
console.log(`Done!`);
process.exit(0);
