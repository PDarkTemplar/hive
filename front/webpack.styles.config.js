const path = require('path');

const importOnce = require('node-sass-import-once');
const tilde = require('node-sass-tilde-importer');

const hash = require('js-sha1');

export const globalStyles = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
        },
    },
    { loader: 'resolve-url-loader' },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            importer: [tilde, importOnce],
            includePaths: [`${__dirname}/src/styles`],
        },
    },
];

export const moduleStyles = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            camelCase: true,
            modules: true,
            getLocalIdent: (context, localIdentName, localName) => {
                let dirName = path.basename(path.dirname(context.resourcePath));
                dirName = dirName
                    .replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`)
                    .replace(/^-/, '');
                const fileName = path.basename(
                    context.resourcePath,
                    path.extname(context.resourcePath)
                );

                let name = dirName;
                if (fileName !== 'index') {
                    name = fileName;
                }

                name = `${name}__${localName}`;
                const hashName = hash(`${context.resourcePath}__${localName}`).substring(0, 5);

                return `${name}--${hashName}`;
            },
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
        },
    },
    { loader: 'resolve-url-loader' },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            importer: [tilde, importOnce],
            includePaths: [`${__dirname}/src/styles`],
        },
    },
];
