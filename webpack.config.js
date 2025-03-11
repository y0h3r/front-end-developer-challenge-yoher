const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DotenvWebpackPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
    compress: true,
    open: true,
    hot: true,
  },
};
