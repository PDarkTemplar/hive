import React, { Component } from 'react';
import { Location } from 'history';
import { Redirect, Route } from 'react-router-dom';

import { inject } from 'components/Hoc';
import constants from '~/constants';

type Props = {
    [name: string]: any;
    // eslint-disable-next-line no-restricted-globals
    location?: Location;
    authorized: boolean;
};

class AuthorizedRoute extends Component<Props> {
    render() {
        const { location, authorized, ...otherProps } = this.props;

        if (!authorized) {
            return (
                <Redirect
                    to={{
                        pathname: constants.paths.login,
                        state: { from: location },
                    }}
                />
            );
        }

        return <Route location={location} {...otherProps} />;
    }
}

const injected = inject(AuthorizedRoute, x => ({
    authorized: x.viewModels.authView.authorized,
}));

export default injected;
