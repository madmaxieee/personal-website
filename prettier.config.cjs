const config = {
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  importorder: [
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^@w+\\w",
    "^@\\w",
    "^./",
  ],
  importorderseparation: true,
  singlequote: true,
};

module.exports = config;
