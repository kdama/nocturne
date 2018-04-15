import { ensureDirSync } from "fs-extra";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const PRODUCTION = process.env.NODE_ENV === "production";

ensureDirSync(path.join(__dirname, "./build/dist"));

const baseConfig: () => webpack.Configuration = () => ({
  cache: true,
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "./build/dist"),
    disableHostCheck: true,
    historyApiFallback: false,
    host: "0.0.0.0",
    https: true,
    noInfo: false,
    quiet: false,
    stats: "errors-only",
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    },
  },
  devtool: "inline-source-map",
  entry: {
    main: [
      // polyfills
      "babel-polyfill",
      "whatwg-fetch",
      "raf/polyfill",

      "./src/scripts/index.tsx",
    ],
  },
  mode: "development",
  module: {
    exprContextCritical: false,
    rules: [
      {
        include: [path.resolve(__dirname, "./src")],
        loader: "ts-loader",
        test: /\.[jt]sx?$/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./build/dist"),
  },
  plugins: [new HtmlWebpackPlugin()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  stats: "errors-only",
});

const productionConfig: () => webpack.Configuration = () => ({
  ...baseConfig(),

  cache: false,
  devtool: false,
  mode: "production",
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  stats: "normal",
});

const config = PRODUCTION ? productionConfig() : baseConfig();

export default config;
