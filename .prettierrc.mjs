/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true,
        semi: false,
        "no-var-keyword": true,
      },
    },
  ],
};
