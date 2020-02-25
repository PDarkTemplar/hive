const path = require('path');

module.exports = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
        '~': 'src',
        store: 'src/store',
        components: 'src/components',
        assets: 'src/assets',
    },
    modules: [path.resolve(__dirname), 'node_modules'],
};
