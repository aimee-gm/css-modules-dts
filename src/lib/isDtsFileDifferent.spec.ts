import { jest } from "@jest/globals";
import { isDtsFileDifferent } from "./isDtsFileDifferent";
import { join } from "node:path";

const logger = { error: jest.fn() };

const __dirname = new URL(".", import.meta.url).pathname;

const testFilePath = (filename: string) =>
  join(__dirname, "../../test", `${filename}.module.css`);

describe("isDtsFileDifferent", () => {
  it("returns false if the file is the same as the expected contents", async () => {
    expect(
      await isDtsFileDifferent(
        testFilePath("dts-contents-correct"),
        ".css.d.ts",
        logger,
      ),
    ).toBe(false);
    expect(logger.error).not.toBeCalled();
  });

  it("returns true if the file is different to the expected contents", async () => {
    expect(
      await isDtsFileDifferent(
        testFilePath("dts-contents-incorrect"),
        ".css.d.ts",
        logger,
      ),
    ).toBe(true);
    expect(logger.error).toBeCalledWith(
      expect.stringContaining("test/dts-contents-incorrect.module.css.d.ts"),
    );
  });
});
