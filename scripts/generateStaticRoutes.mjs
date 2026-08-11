import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// IIS static hosting resolves folders before the React app can handle a route.
// Give each client-side entry point a physical default document so /tienda
// works without requiring the optional IIS URL Rewrite module.
const routes = ["tienda"];
const entry = resolve("dist/index.html");

for (const route of routes) {
  const directory = resolve("dist", route);
  await mkdir(directory, { recursive: true });
  await copyFile(entry, resolve(directory, "index.html"));
}

console.log(`Generadas ${routes.length} rutas estaticas para IIS.`);
