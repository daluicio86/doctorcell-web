import { execFileSync } from "node:child_process";
import { access, readFile, rename, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "dist");
const entryFile = resolve(distDirectory, "index.html");
const archiveFile = resolve(distDirectory, "dc.zip");
const temporaryArchive = resolve(projectRoot, "dist.tmp.zip");

const html = await readFile(entryFile, "utf8");
const references = [...html.matchAll(/<(?:script|link)\b[^>]+(?:src|href)=["']([^"']+)["']/gi)]
  .map((match) => match[1])
  .filter((reference) => reference.startsWith("/") && !reference.startsWith("//"));

for (const reference of references) {
  const pathname = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  await access(resolve(distDirectory, `.${pathname}`));
}

await rm(temporaryArchive, { force: true });
await rm(archiveFile, { force: true });

if (process.platform !== "win32") {
  throw new Error("El empaquetado ZIP requiere PowerShell en Windows.");
}

const command = [
  "$ErrorActionPreference = 'Stop'",
  `Compress-Archive -Path '${distDirectory.replaceAll("'", "''")}\\*' -DestinationPath '${temporaryArchive.replaceAll("'", "''")}' -CompressionLevel Optimal -Force`,
].join("; ");

execFileSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", command], {
  cwd: projectRoot,
  stdio: "inherit",
});

await rename(temporaryArchive, archiveFile);

console.log(`Archivo listo: dist/dc.zip (${references.length} recursos de index.html verificados).`);
