import { execFileSync } from "node:child_process";
import { access, cp, copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "dist");
const archiveFile = resolve(distDirectory, "dc.zip");
const temporaryArchive = resolve(projectRoot, "dist.tmp.zip");
const html = await readFile(resolve(distDirectory, "index.html"), "utf8");
const references = [...html.matchAll(/<(?:script|link)\b[^>]+(?:src|href)=["']([^"']+)["']/gi)]
  .map((match) => match[1]).filter((reference) => reference.startsWith("/") && !reference.startsWith("//"));
for (const reference of references) await access(resolve(distDirectory, `.${decodeURIComponent(reference.split(/[?#]/, 1)[0])}`));
if (process.platform !== "win32") throw new Error("El empaquetado ZIP requiere PowerShell en Windows.");
await rm(temporaryArchive, { force: true });
await rm(archiveFile, { force: true });
const runtime = await mkdtemp(resolve(tmpdir(), "doctorcell-release-"));
try {
  await cp(distDirectory, resolve(runtime, "dist"), { recursive: true, filter: (path) => !path.toLowerCase().endsWith(".zip") && path !== resolve(distDirectory, "web.config") });
  await cp(resolve(projectRoot, "server"), resolve(runtime, "server"), { recursive: true, filter: (path) => !path.toLowerCase().endsWith(".ndjson") });
  await mkdir(resolve(runtime, "src/utils"), { recursive: true });
  await mkdir(resolve(runtime, "src/data"), { recursive: true });
  for (const path of ["server.mjs", "src/utils/contact.js", "src/data/siteConfig.js"]) await copyFile(resolve(projectRoot, path), resolve(runtime, path));
  await copyFile(resolve(projectRoot, "public/web.config"), resolve(runtime, "web.config"));
  await writeFile(resolve(runtime, "package.json"), JSON.stringify({ name: "doctorcell-runtime", private: true, type: "module", scripts: { start: "node server.mjs" } }));
  const command = [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName System.IO.Compression.FileSystem",
    `[System.IO.Compression.ZipFile]::CreateFromDirectory('${runtime.replaceAll("'", "''")}', '${temporaryArchive.replaceAll("'", "''")}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`
  ].join("; ");
  execFileSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", command], { cwd: projectRoot, stdio: "inherit", windowsHide: true });
  await rename(temporaryArchive, archiveFile);
  console.log(`Archivo listo: dist/dc.zip (servidor Node, configuración IIS y ${references.length} recursos verificados). Conservar data/ al desplegar.`);
} finally {
  const target = resolve(runtime);
  if (!target.startsWith(resolve(tmpdir()) + sep) || !basename(target).startsWith("doctorcell-release-")) throw new Error("Ruta temporal inesperada.");
  await rm(target, { recursive: true, force: true });
}
