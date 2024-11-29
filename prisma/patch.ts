import { join } from "@std/path";

const __dirname = new URL(".", import.meta.url).pathname;

// File paths
const dtsFilePath = join(__dirname, "./generated/client/index.d.ts");
const jsFilePath = join(__dirname, "./generated/client/index.js");
const cjsFilePath = join(__dirname, "./generated/client/index.cjs");
const runtimeJsFilePath = join(__dirname, "./generated/client/runtime/library.js");
const runtimeCjsFilePath = join(__dirname, "./generated/client/runtime/library.cjs");

// Text replacements
const oldText = "./runtime/library.js";
const newText = "./runtime/library.d.ts";
const oldRequire = "require('./runtime/library.js')";
const newRequire = "require('./runtime/library.cjs')";
const oldImport = "'./runtime/library.js'";
const newImport = "'./runtime/library.cjs'";

try {
  // Check if the runtime file exists
  try {
    await Deno.stat(runtimeJsFilePath);
    // console.log(`File found: ${runtimeJsFilePath}`);
  } catch {
    throw new Error(`File not found: ${runtimeJsFilePath}`);
  }

  // Rename "./generated/client/runtime/library.js" to "./generated/client/runtime/library.cjs"
  await Deno.rename(runtimeJsFilePath, runtimeCjsFilePath);
  // console.log(`Renamed ${runtimeJsFilePath} to ${runtimeCjsFilePath}.`);

  // Update the index.d.ts file
  const dtsFileContent = await Deno.readTextFile(dtsFilePath);
  const updatedDtsContent = dtsFileContent.replace(new RegExp(oldText, "g"), newText);
  await Deno.writeTextFile(dtsFilePath, updatedDtsContent);

  /*console.log(
    `Replaced all occurrences of '${oldText}' with '${newText}' in ${dtsFilePath}.`
  );*/

  // Rename index.js to index.cjs and update require statement
  const jsFileContent = await Deno.readTextFile(jsFilePath);
  const updatedJsContent = jsFileContent.replace(oldRequire, newRequire);
  await Deno.writeTextFile(cjsFilePath, updatedJsContent);
  await Deno.remove(jsFilePath);

  // console.log(`Renamed ${jsFilePath} to ${cjsFilePath} and updated require statement.`);

  // Update import paths in index.cjs
  const cjsFileContent = await Deno.readTextFile(cjsFilePath);
  const updatedCjsContent = cjsFileContent.replace(new RegExp(oldImport, "g"), newImport);
  await Deno.writeTextFile(cjsFilePath, updatedCjsContent);

  /*console.log(
    `Replaced all occurrences of ${oldImport} with ${newImport} in ${cjsFilePath}.`
  );*/
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error processing file: ${error.message}`);
  } else {
    console.error("Unknown error occurred");
  }
}
