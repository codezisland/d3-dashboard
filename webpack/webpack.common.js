const path = require('path');
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: glob.sync(path.join(__dirname, '../src/**/*.js'))
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
             {
                from: path.join(__dirname, '../src/index.html'),
                to: path.join(__dirname, '../dist/')
            }
        ])
    ]
};
