module.exports = {
    sourceMap: 'inline',
    parser: 'postcss-scss',
    plugins: {
        'postcss-assets': { loadPaths: ['src/assets'] },
        'postcss-inline-svg': { path: 'src/assets' },
        autoprefixer: {},
    },
};
