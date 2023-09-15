import mockFs from "mock-fs";
import { getDtsContents } from "./getDtsContents";

afterEach(() => {
  mockFs.restore();
});

describe("getDtsContents", () => {
  it("converts CSS to a declaration file", async () => {
    mockFs({
      "src/styles.css": ".foo { color: red; }",
    });
    const dts = await getDtsContents("src/styles.css");

    expect(dts).toEqual(
      `
declare const styles: {
  readonly "foo": string;
};
export default styles;
`.trim(),
    );
  });

  it("generates declarations for elements with class selectors", async () => {
    mockFs({
      "src/styles.css": "div.foo { color: red; }\n.bar { color: blue; }",
    });

    const dts = await getDtsContents("src/styles.css");
    expect(dts).toEqual(
      `
declare const styles: {
  readonly "bar": string;
  readonly "foo": string;
};
export default styles;
`.trim(),
    );
  });

  it("generates declarations for multiple class selectors", async () => {
    mockFs({
      "src/styles.css":
        "div.foo.bar { color: red; }\n#fib.baz { color: blue; }",
    });

    const dts = await getDtsContents("src/styles.css");

    expect(dts).toEqual(
      `
declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "foo": string;
};
export default styles;
`.trim(),
    );
  });

  it("generates declarations for nested class selectors", async () => {
    mockFs({
      "src/styles.css":
        ".foo { &.bar { color: red; } & div .baz { color: blue; } }",
    });

    const dts = await getDtsContents("src/styles.css");

    expect(dts).toEqual(
      `
declare const styles: {
  readonly "bar": string;
  readonly "baz": string;
  readonly "foo": string;
};
export default styles;
`.trim(),
    );
  });

  it.only("handles ID selectors", async () => {
    mockFs({
      "src/styles.css": "#foo { color: red; }",
    });

    const dts = await getDtsContents("src/styles.css");

    expect(dts).toEqual(
      `
declare const styles: {
  readonly "foo": string;
};
export default styles;
`.trim(),
    );
  });
});
