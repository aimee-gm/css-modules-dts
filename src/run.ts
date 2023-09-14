import chokiadr from "chokidar";

import { glob } from "glob";
import { writeDtsFile } from "./lib/writeDtsFile.js";
import { isDtsFileDifferent } from "./lib/isDtsFileDifferent.js";

interface Arguments {
  pattern: string;
  listDifferent: boolean;
  watch: boolean;
  extension: string;
}

export async function run(args: Arguments): Promise<number | void> {
  const filePaths = await glob(args.pattern);

  const write = (filepath: string) =>
    writeDtsFile(filepath, args.extension, console);
  const isDifferent = (filepath: string) =>
    isDtsFileDifferent(filepath, args.extension, console);

  if (args.watch) {
    const watcher = chokiadr.watch(args.pattern.replace(/\\/g, "/"));
    watcher.on("add", write).on("change", write);
  } else {
    const errors = await Promise.all(
      filePaths.map<Promise<boolean | void>>(
        args.listDifferent ? isDifferent : write,
      ),
    );

    return errors.filter((error) => error).length;
  }
}
