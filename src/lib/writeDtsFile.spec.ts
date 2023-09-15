import { jest } from "@jest/globals";
import { writeDtsFile } from "./writeDtsFile";
import { readFile, unlink } from "node:fs/promises";
import { join } from "node:path";

const logger = { log: jest.fn() };

const __dirname = new URL(".", import.meta.url).pathname;

const testFilePath = (filename: string) =>
  join(__dirname, "../../test", `${filename}.module.css`);

const cssFile = testFilePath("write-dts-file");
const dtsFile = `${cssFile}.d.ts`;

const cleanUp = async () => {
  await unlink(dtsFile).catch(() => {});
};

describe("writeDtsFile", () => {
  beforeEach(cleanUp);
  afterEach(cleanUp);

  it("writes the file and logs the filename", async () => {
    await expect(readFile(dtsFile, "utf-8")).rejects.toThrow();

    await writeDtsFile(cssFile, ".css.d.ts", logger);

    expect(logger.log).toBeCalledWith(dtsFile);

    expect(await readFile(dtsFile, "utf-8")).toEqual(
      'declare const styles: {\n  readonly "foo": string;\n};\nexport default styles;\n',
    );
  });
});
