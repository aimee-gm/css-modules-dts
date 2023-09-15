import { readFile } from "node:fs/promises";
import { parse as parseCss, walk } from "css-tree";

export async function getDtsContents(filename: string) {
  const css = await readFile(filename, "utf-8");
  const classNames = new Set();

  const ast = parseCss(css, { filename });

  walk(ast, (node) => {
    // ID Selectors are valid local names in CSS modules
    if (node.type === "ClassSelector" || node.type === "IdSelector") {
      classNames.add(node.name);
    }
  });

  const ts = `declare const styles: {\n${Array.from(classNames)
    .sort()
    .map((name) => `  readonly "${name}": string;`)
    .join(`\n`)}\n};\nexport default styles;`;

  return ts;
}
