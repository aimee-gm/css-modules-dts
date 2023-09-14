import mockFs from "mock-fs";
import { jest } from "@jest/globals";
import { isDtsFileDifferent } from "./isDtsFileDifferent";

const logger = { error: jest.fn() };

afterEach(() => {
  mockFs.restore();
});

describe("isDtsFileDifferent", () => {
  it("returns false if the file is the same as the expected contents", async () => {
    mockFs({
      "src/styles.css": ".foo { color: red; }",
      "src/styles.css.d.ts":
        'declare const styles: {\n  readonly "foo": string;\n};\nexport default styles;',
    });

    expect(
      await isDtsFileDifferent("src/styles.css", ".css.d.ts", logger),
    ).toBe(false);
    expect(logger.error).not.toBeCalled();
  });

  it("returns true if the file is different to the expected contents", async () => {
    mockFs({
      "src/styles.css": ".foo { color: red; }",
      "src/styles.css.d.ts":
        'declare const styles: {\n  readonly "foo": string;\n  readonly "bar": string;\n};\nexport default styles;',
    });

    expect(
      await isDtsFileDifferent("src/styles.css", ".css.d.ts", logger),
    ).toBe(true);
    expect(logger.error).toBeCalledWith("src/styles.css.d.ts");
  });
});
