import { join } from "node:path";
import { readDtsFile } from "./readDtsFile";

const __dirname = new URL(".", import.meta.url).pathname;

const testFilePath = (filename: string) =>
  join(__dirname, "../../test", `${filename}.module.css.d.ts`);

describe("readDtsFile", () => {
  it("reads and returns the file", async () => {
    expect(await readDtsFile(testFilePath("read-dts"))).toEqual(
      `declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "foo": string;
};
export default styles;`,
    );
  });

  it("returns undefined if the file does not exist", async () => {
    expect(
      await readDtsFile(testFilePath("this-file-does-not-exist")),
    ).toBeUndefined();
  });
});
