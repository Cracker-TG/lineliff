const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  console.log(argv.mode);
  return {
    resolve: {
      extensions: [".jsx", ".js"],
      fallback: { util: false, crypto: false },
      mainFields: ["main", "module", "browser"],
    },
    entry: {
      main: path.resolve(__dirname, "./src/app.jsx"),
    },
    devtool:
      argv.mode === "production"
        ? "eval-cheap-module-source-map"
        : "source-map",
    module: {
      rules: [
        {
          test: /\.(js|ts|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.(mp4|png|jpg|svg|mp3|woff2|woff)$/,
          loader: "file-loader",
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "./dist/"),
      historyApiFallback: true,
      compress: true,
      hot: true,
      disableHostCheck: true,
      host: "0.0.0.0",
      port: 3000,
      publicPath: "/",
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.[contenthash].js",
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./index.html", title: "LIFF" }),
      new Dotenv(),
    ],
  };
};
