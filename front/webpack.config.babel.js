import merge from 'webpack-merge';
import dotenv from 'dotenv';

import bc from './webpack.base.config';
import devConfig from './webpack.development.config';
import prodConfig from './webpack.production.config';

export default (env = {}) => {
    if (env.p) {
        process.env.NODE_ENV = 'production';
    } else {
        process.env.NODE_ENV = 'development';
    }

    const dev = process.env.NODE_ENV === 'development';

    dotenv.config({ path: dev ? './dev.env' : './prod.env' });

    const baseConfig = bc(env);

    const envConfig = dev ? devConfig : prodConfig;
    const config = envConfig(env);

    return merge.smart(baseConfig, config);
};
