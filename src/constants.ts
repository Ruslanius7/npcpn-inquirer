import url from "node:url";
import path from "node:path";
import fs from "fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PROJECT_ROOT = path.resolve(
  __dirname,
  import.meta.env.DEV ? ".." : "../../../.."
);

const DATABASE_DIR_PATH = path.resolve(PROJECT_ROOT, "db");

if (!fs.existsSync(DATABASE_DIR_PATH)) {
  fs.mkdirSync(DATABASE_DIR_PATH, { recursive: true });
}

export const DATABASE_PATH = path.resolve(
  DATABASE_DIR_PATH,
  `${import.meta.env.MODE}.json`
);
