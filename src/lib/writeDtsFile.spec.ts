import mockFs from "mock-fs";
import { jest } from "@jest/globals";
import { writeDtsFile } from "./writeDtsFile";
import { readFile } from "node:fs/promises";

const logger = { log: jest.fn() };

afterEach(() => {
  mockFs.restore();
});

describe("writeDtsFile", () => {
  it("writes the file and logs the filename", async () => {
    mockFs({
      "src/styles.css": ".foo { color: red; }",
    });

    await writeDtsFile("src/styles.css", ".css.d.ts", logger);

    expect(logger.log).toBeCalledWith("src/styles.css.d.ts");

    expect(await readFile("src/styles.css.d.ts", "utf-8")).toEqual(
      'declare const styles: {\n  readonly "foo": string;\n};\nexport default styles;',
    );
  });
});
