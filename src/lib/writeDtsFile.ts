import { writeFile } from "node:fs/promises";
import { dtsPath } from "./dtsPath.js";
import { getDtsContents } from "./getDtsContents.js";

export async function writeDtsFile(
  filepath: string,
  extension: string,
  logger: { log: (message: string) => void },
) {
  const dtsFilepath = dtsPath(filepath, extension);
  const dts = await getDtsContents(filepath);
  await writeFile(dtsFilepath, dts, "utf-8");
  logger.log(dtsFilepath);
}
