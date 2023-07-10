// Copyright (c) Wictor Wilén. All rights reserved.
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const fs = require("fs");

const nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

const config = [
  {
    entry: {
      app: [__dirname + "/app/index.ts"],
      command: [__dirname + "/command/index.ts"],
      common: [__dirname + "/common/index.ts"],
      controller: [__dirname + "/controller/index.ts"],
      dto: [__dirname + "/dto/index.ts"],
      entity: [__dirname + "/entity/index.ts"],
      interface: [__dirname + "/interface/index.ts"],
      module: [__dirname + "/module/index.ts"],
      query: [__dirname + "/query/index.ts"],
      utils: [__dirname + "/utils/index.ts"]
    },
    output: {
      path: __dirname + "/generators/",
      filename: "[name]/index.js",
      libraryTarget: "umd"
    },
    externals: nodeModules,
    devtool: "source-map",
    mode: "production",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {}
    },
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/lib/, /dist/, /templates/, /temp-templates/],
          use: [
            {
              loader: "ts-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "app/templates",
            to: "app/templates",
            info: { minimized: true }
          },
          {
            from: "command/templates",
            to: "command/templates",
            info: { minimized: true }
          },
          {
            from: "controller/templates",
            to: "controller/templates",
            info: { minimized: true }
          },
          {
            from: "dto/templates",
            to: "dto/templates",
            info: { minimized: true }
          },
          {
            from: "entity/templates",
            to: "entity/templates",
            info: { minimized: true }
          },
          {
            from: "interface/templates",
            to: "interface/templates",
            info: { minimized: true }
          },
          {
            from: "module/templates",
            to: "module/templates",
            info: { minimized: true }
          },
          {
            from: "query/templates",
            to: "query/templates",
            info: { minimized: true }
          }
        ]
      })
    ]
  }
];

module.exports = config;
