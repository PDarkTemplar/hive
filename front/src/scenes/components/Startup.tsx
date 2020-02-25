import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

import MobileDetect from 'mobile-detect';
import Router, { AnonymousRoute, AuthorizedRoute } from 'components/Router';
import { inject } from 'components/Hoc';
import constants from '~/constants';

import Auth from '~/store/common/services/Auth';

import AuthorizedComp from '~/scenes/scenes/Auth';
import LoginComp from '~/scenes/scenes/Login';

type Props = {
    initialized: boolean;
    authService: Auth;
};

class Startup extends Component<Props> {
    componentDidMount() {
        const { authService } = this.props;

        authService.loginLan();
    }

    render() {
        const { initialized } = this.props;

        if (!initialized) return null;

        return (
            <Router>
                <Switch>
                    <Redirect exact from={constants.paths.base} to={constants.paths.dashboard} />
                    <AnonymousRoute path={constants.paths.login} component={LoginComp} />
                    <AuthorizedRoute path={constants.paths.base} component={AuthorizedComp} />
                </Switch>
            </Router>
        );
    }
}

const injected = inject(Startup, x => ({
    initialized: x.viewModels.commonView.initialized,
    authService: x.services.authService,
}));

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const mobile = mobileDetect.mobile() != null || mobileDetect.tablet() != null;

export default DragDropContext(mobile ? (TouchBackend as any) : HTML5Backend)(injected);
