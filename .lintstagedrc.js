import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => relative(process.cwd(), f)).join(" ")}`;

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
  "*.{json,md,css}": ["prettier --write"],
};

export default lintStagedConfig;
