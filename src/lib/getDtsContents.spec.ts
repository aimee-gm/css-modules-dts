import { getDtsContents } from "./getDtsContents";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;

const testFilePath = (filename: string) =>
  join(__dirname, "../../test", `${filename}.module.css`);

describe("getDtsContents", () => {
  it("converts CSS to a declaration file", async () => {
    const dts = await getDtsContents(testFilePath("css-to-dts"));

    expect(dts).toEqual(
      `declare const styles: {
  readonly "foo": string;
};
export default styles;
`,
    );
  });

  it("generates declarations for elements with class selectors", async () => {
    const dts = await getDtsContents(testFilePath("class-selectors"));
    expect(dts).toEqual(
      `declare const styles: {
  readonly "bar": string;
  readonly "foo": string;
};
export default styles;
`,
    );
  });

  it("generates declarations for multiple class selectors", async () => {
    const dts = await getDtsContents(testFilePath("multiple-selectors"));

    expect(dts).toEqual(
      `declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "fib": string;
  readonly "foo": string;
};
export default styles;
`,
    );
  });

  it("generates declarations for nested class selectors", async () => {
    const dts = await getDtsContents(testFilePath("nested-selectors"));

    expect(dts).toEqual(
      `declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "foo": string;
};
export default styles;
`,
    );
  });

  it("handles ID selectors", async () => {
    const dts = await getDtsContents(testFilePath("id-selectors"));

    expect(dts).toEqual(
      `declare const styles: {
  readonly "foo": string;
};
export default styles;
`,
    );
  });

  it("handles global selectors", async () => {
    const dts = await getDtsContents(testFilePath("global-selectors"));

    expect(dts).toEqual(
      `declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
};
export default styles;
`,
    );
  });
});
