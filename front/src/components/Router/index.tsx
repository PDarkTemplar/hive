import React, { ReactNode, Component } from 'react';
import { Router as ReactRouter } from 'react-router-dom';

import history from '~/history';

type Props = {
    children: ReactNode;
};

class Router extends Component<Props> {
    render() {
        const { children } = this.props;

        return <ReactRouter history={history}>{children}</ReactRouter>;
    }
}

export default Router;
export { default as AnonymousRoute } from './AnonymousRoute';
export { default as AuthorizedRoute } from './AuthorizedRoute';
