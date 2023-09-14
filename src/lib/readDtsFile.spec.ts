import { readDtsFile } from "./readDtsFile";
import mockFs from "mock-fs";

afterEach(() => {
  mockFs.restore();
});

describe("readDtsFile", () => {
  it("reads and returns the file", async () => {
    mockFs({
      "src/styles.css": `declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "foo": string;
};
export default styles;`,
    });

    expect(await readDtsFile("src/styles.css")).toEqual(
      `declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "foo": string;
};
export default styles;`,
    );
  });

  it("returns undefined if the file does not exist", async () => {
    mockFs({});
    expect(await readDtsFile("src/styles.css")).toBeUndefined();
  });
});
