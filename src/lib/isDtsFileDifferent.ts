import { dtsPath } from "./dtsPath.js";
import { getDtsContents } from "./getDtsContents.js";
import { readDtsFile } from "./readDtsFile.js";

export async function isDtsFileDifferent(
  filepath: string,
  extension: string,
  logger: { error: (message: string) => void },
) {
  const dtsFilePath = dtsPath(filepath, extension);
  const dts = await getDtsContents(filepath);

  const onDisk = await readDtsFile(dtsFilePath);
  const isDifferent = dts !== onDisk;

  if (isDifferent) {
    logger.error(dtsFilePath);
  }

  return isDifferent;
}
