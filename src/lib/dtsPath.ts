import { join, parse as parsePath } from "node:path";

export function dtsPath(filepath: string, extension: string) {
  const { dir, name } = parsePath(filepath);
  return join(dir, `${name}${extension}`);
}
