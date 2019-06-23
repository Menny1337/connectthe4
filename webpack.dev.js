const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = env => {
    return merge(common(env), {
        devtool: 'inline-source-map',
        mode: 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        }
    });
};


