import { join } from "@std/path";

const __dirname = new URL(".", import.meta.url).pathname;

const filePath = join(__dirname, "./generated/client/index.d.ts");
const oldText = "./runtime/library.js";
const newText = "./runtime/library.d.ts";

try {
  const fileContent = await Deno.readTextFile(filePath);

  const updatedContent = fileContent.replace(new RegExp(oldText, "g"), newText);

  await Deno.writeTextFile(filePath, updatedContent);

  /*console.log(
    `Replaced all occurrences of '${oldText}' with '${newText}' in ${filePath}.`
  );*/
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error processing file: ${error.message}`);
  } else {
    console.error("Unknown error occurred");
  }
}
