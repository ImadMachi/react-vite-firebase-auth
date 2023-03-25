if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: [
      require("postcss-normalize")({
        forceImport: true,
      }),
      require("autoprefixer"),
    ],
  };
} else {
  module.exports = {
    plugins: [],
  };
}
