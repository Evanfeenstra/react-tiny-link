const merge = require('webpack-merge');

module.exports = merge(require('./webpack.config.base'), {
    externals: {
        "react": "react",
        "electron": "electron",
        "prop-types": "prop-types",
    }
});
