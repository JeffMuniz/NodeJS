require.extensions[".css"] = () => {};
const Dotenv = require("dotenv-webpack");
const Path = require("path");
const hash = require("string-hash");
const fs = require("fs");

const outputPath = Path.join(__dirname, "/web");

const replaceInFile = (filePath, toReplace, replacement) => {
  const replaceRegExp = new RegExp(toReplace, "g");
  const str = fs.readFileSync(filePath, "utf8");
  const out = str.replace(replaceRegExp, replacement);
  fs.writeFileSync(filePath, out);
};

module.exports = env => {
  const environment = env.NODE_ENV;
  const CONFIG = {
    entry: ["babel-polyfill", "react-hot-loader/patch", "./index.js"],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            { loader: "css-loader", options: { sourceMap: true } },
          ],
          include: [
            /flexboxgrid/,
            /react-select/,
            /react-popover/,
            /react-dates/,
          ],
        },
        {
          test: /\.(png|jpg|gif|xlsx|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {},
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ({ resource }) => [
            {
              loader: "babel-loader",
            },
            {
              loader: "react-svg-loader",
              options: {
                svgo: {
                  plugins: [
                    {
                      cleanupIDs: {
                        prefix: `svg${hash(
                          Path.relative(__dirname, resource),
                        )}`,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js"],
    },
    output: {
      path: outputPath,
      publicPath: "/",
      filename: "bundle.js",
    },
    plugins: [],
    devtool: "source-map",
    devServer: {
      contentBase: "./web",
      historyApiFallback: true,
      hot: true,
    },
  };

  if (
    ![
      "development",
      "mock",
      "local_qa",
      "local_staging",
      "local_stgdev",
    ].includes(environment)
  ) {
    CONFIG.output.filename = "bundle.[hash].js";
    // eslint-disable-next-line func-names
    CONFIG.plugins.push(function() {
      this.plugin("done", stats => {
        const bundleHash = stats.hash;

        replaceInFile(
          Path.join(CONFIG.output.path, "index.html"),
          "bundle.js",
          `bundle.${bundleHash}.js`,
        );
      });
    });
  }

  switch (environment) {
    case "mock":
      CONFIG.plugins.push(
        new Dotenv({
          path: "./.env.mock",
        }),
      );
      break;
    case "qa":
    case "local_qa":
      CONFIG.plugins.push(
        new Dotenv({
          path: "./.env.qa",
        }),
      );
      break;
    case "staging":
    case "local_staging":
      CONFIG.plugins.push(
        new Dotenv({
          path: "./.env.staging",
        }),
      );
      break;
    case "local_stgdev":
      CONFIG.plugins.push(
        new Dotenv({
          path: "./.env.stgdev",
        }),
      );
      break;
    case "production":
      CONFIG.plugins.push(
        new Dotenv({
          path: "./.env.production",
        }),
      );
      break;
    default:
      CONFIG.plugins.push(
        new Dotenv({
          path: "./.env",
        }),
      );
  }
  return CONFIG;
};
