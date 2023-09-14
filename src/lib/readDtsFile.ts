import { readFile, stat } from "node:fs/promises";

// TODO: Move to isDtsFileDifferent.ts
export async function readDtsFile(filepath: string) {
  const exists = await stat(filepath)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    return undefined;
  }

  return readFile(filepath, "utf-8");
}
