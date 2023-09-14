import { dtsPath } from "./dtsPath";

describe("dtsPath", () => {
  it("returns the filename with the supplied extension", () => {
    expect(dtsPath("foo/bar.css", ".css.d.ts")).toBe("foo/bar.css.d.ts");
    expect(dtsPath("foo/bar.css", ".d.css.ts")).toBe("foo/bar.d.css.ts");
  });
});
