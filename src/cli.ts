#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { run } from "./run.js";
import path from "node:path";

const program = yargs(hideBin(process.argv))
  .option("p", {
    alias: "pattern",
    describe: "Glob pattern for matching css files",
    type: "string",
    required: true,
  })
  .option("l", {
    alias: "list-different",
    describe:
      "List files that are different from the generated declaration file",
    type: "boolean",
    default: false,
  })
  .option("w", {
    alias: "watch",
    describe: "Watch files for changes",
    type: "boolean",
    default: false,
  })
  .option("e", {
    alias: "extension",
    describe: "Extension of the generated declaration file",
    default: ".css.d.ts",
  })
  .option("h", {
    alias: "help",
  });

async function exec() {
  const args = await program.parse();

  if (args.h) {
    program.showHelp();
    return;
  }

  const errorCount = await run({
    pattern: path.join(process.cwd(), args.p),
    listDifferent: args.l,
    watch: args.w,
    extension: args.e,
  }).catch((err: Error) => {
    console.error(err);
    console.log(err.stack);
    process.exit(1);
  });

  if (typeof errorCount === "number") {
    process.exit(errorCount);
  }
}

exec();
