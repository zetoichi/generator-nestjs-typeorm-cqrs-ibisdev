// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const config = [{
    entry: {
        app: [
            __dirname + '/src/app/index.ts'
        ],
        command: [
            __dirname + '/src/command/index.ts'
        ],
        common: [
            __dirname + '/src/common/index.ts'
        ],
        controller: [
            __dirname + '/src/controller/index.ts'
        ],
        dto: [
            __dirname + '/src/dto/index.ts'
        ],
        entity: [
            __dirname + '/src/entity/index.ts'
        ],
        interface: [
            __dirname + '/src/interface/index.ts'
        ],
        module: [
            __dirname + '/src/module/index.ts'
        ],
        query: [
            __dirname + '/src/query/index.ts'
        ],
        utils: [
            __dirname + '/src/utils/index.ts'
        ],
    },
    output: {
        path: __dirname + '/generators/',
        filename: '[name]/index.js',
        libraryTarget: 'umd'
    },
    externals: nodeModules,
    devtool: 'source-map',
    mode: 'production',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {}
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: [/lib/, /dist/, /templates/, /temp-templates/],
            use: [{
                loader: "ts-loader"
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/app/templates',
                    to: 'app/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/command/templates',
                    to: 'command/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/controller/templates',
                    to: 'controller/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/dto/templates',
                    to: 'dto/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/entity/templates',
                    to: 'entity/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/interface/templates',
                    to: 'interface/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/module/templates',
                    to: 'module/templates',
                    info: { minimized: true }
                },
                {
                    from: 'src/query/templates',
                    to: 'query/templates',
                    info: { minimized: true }
                }
            ]
        })
    ]
}];


module.exports = config;