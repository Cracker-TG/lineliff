const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    resolve: {
      extensions: [".jsx", ".js"],
      fallback: { util: false, crypto: false },
      mainFields: ["main", "module", "browser"],
    },
    entry: {
      main: path.resolve(__dirname, "./src/app.jsx"),
    },
    devtool: "source-map",
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
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
      publicPath: "./",
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./index.html", title: "FLEXQ" }),
    ],
  };
};
