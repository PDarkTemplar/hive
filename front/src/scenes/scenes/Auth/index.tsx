import React, { Fragment, Component } from 'react';
import { Switch } from 'react-router-dom';
import { Location } from 'history';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { hot } from 'react-hot-loader';

import { AuthorizedRoute } from 'components/Router';
import { inject } from 'components/Hoc';
import constants from '~/constants';

import Tabs from './components/Tabs';
import WidthCalculator from './components/WidthCalculator';

import Admin from './scenes/Admin';
import Dashboard from './scenes/Dashboard';

import styles from './index.scss';

type Props = {
    defaultPage: string;
    location: Location;
    unload: () => void;
};

class Auth extends Component<Props> {
    componentDidMount() {
        window.addEventListener('beforeunload', this.unload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.unload);
    }

    unload = () => {
        const { unload } = this.props;

        unload();
    };

    render() {
        const { location } = this.props;
        const currentKey = location.pathname || '/';
        const timeout = { enter: 300, exit: 200 };

        return (
            <Fragment>
                <WidthCalculator />
                <Tabs location={location} />
                <TransitionGroup component="div" className={styles.mainTransition}>
                    <CSSTransition
                        key={currentKey}
                        timeout={timeout}
                        classNames="animated-fade"
                        appear
                    >
                        <div className={styles.transition}>
                            <Switch location={location}>
                                <AuthorizedRoute path={constants.paths.admin} component={Admin} />
                                <AuthorizedRoute
                                    path={constants.paths.dashboard}
                                    component={Dashboard}
                                />
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}

const injected = inject(Auth, x => ({
    unload: x.services.mqttService.unload,
}));

export default hot(module)(injected);
