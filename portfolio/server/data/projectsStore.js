import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { projects as seedProjects } from "./projects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_FILE_PATH = path.join(__dirname, "projects.store.json");

async function ensureStoreFile() {
  try {
    await fs.access(STORE_FILE_PATH);
  } catch {
    await fs.writeFile(STORE_FILE_PATH, JSON.stringify(seedProjects, null, 2), "utf-8");
  }
}

export async function readProjectsStore() {
  await ensureStoreFile();

  try {
    const raw = await fs.readFile(STORE_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fall back to seed data if disk content is temporarily invalid.
  }

  return [...seedProjects];
}

export async function writeProjectsStore(projects) {
  await fs.writeFile(STORE_FILE_PATH, JSON.stringify(projects, null, 2), "utf-8");
}
