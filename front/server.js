/* eslint-disable */
import express from 'express';
import path from 'path';

const PORT = 4000;

const app = express();

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel').default();
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
        colors: true,
    },
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(PORT, error => {
    if (error) {
        console.error(error);
    } else {
        console.info(`Listening on port ${PORT}.`);
    }
});