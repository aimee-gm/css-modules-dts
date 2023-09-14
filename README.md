# css-modules-dts

[![npm version](https://badge.fury.io/js/css-modules-dts.svg)](https://badge.fury.io/js/css-modules-dts)

Creates TypeScript declaration files from `.css` files. This package is [pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

- [css-modules-dts](#css-modules-dts)
  - [About](#about)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Options](#options)
      - [`--pattern` or `-p`](#--pattern-or--p)
      - [`--watch` or `-w`](#--watch-or--w)
      - [`--list-different` or `-l`](#--list-different-or--l)
      - [`--extension` or `-e`](#--extension-or--e)
  - [CSS nesting](#css-nesting)

## About

Given the following CSS file

```css
/* MyComponent.module.css */

.foo {
  color: red;

  &.bar {
    color: blue;
  }
}
```

`css-modules-dts` will output:

```ts
/* MyComponent.module.css.d.ts */
declare const styles: {
  readonly foo: string;
  readonly bar: string;
};
export default styles;
```

Your CSS modules can then be used in TypeScript, with added type safety.

```tsx
/* app.tsx */
import styles from "./MyComponent.module.css";

// React is only given as an example, and is not restricted to this use
const MyComponent = () => <div className={styles.foo}>Hello, World!</div>;
```

## Installation

```
  npm i -D css-modules-dts
```

## Usage

```shell
  npx css-modules-dts -p 'src/**/*.module.css'
```

This command will write TypeScript declaration files for all matched CSS files next to them on disk.

### Options

#### `--pattern` or `-p`

Glob pattern to use to find CSS files. **Required**.

#### `--watch` or `-w`

Watch matched files, and rebuild TypeScript declaration files when changed.

#### `--list-different` or `-l`

Will compare expected declaration files for matched CSS files with those on disk. Will log all files that are different, and terminate with an exit code equal to the number of differences found.

#### `--extension` or `-e`

Extension for the generated TypeScript declaration file. Defaults to `.css.d.ts`. This can be changed to `.d.css.ts` if you are using [`allowArbitraryExtensions`](https://www.typescriptlang.org/tsconfig/#allowArbitraryExtensions) in your TypeScript configuration.

## CSS nesting

The dependency used for parsing CSS, `css-tree` requires CSS nesting to use explicit nesting selectors, i.e. `&`.

```css
.foo {
  > .bar {
    // this will NOT be detected
  }

  & > .baz {
    // this will be detected
  }
}
```
