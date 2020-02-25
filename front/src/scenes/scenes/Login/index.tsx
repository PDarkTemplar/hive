import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { Redirect } from 'react-router-dom';

import { Card, Elevation, FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core';

import { inject } from 'components/Hoc';
import constants from '~/constants';

import AuthView from 'store/common/viewModels/Auth';
import AuthService from 'store/common/services/Auth';

import styles from './index.scss';

type Props = {
    authorized: boolean;
    authView: AuthView;
    authService: AuthService;
};

class Login extends Component<Props> {
    setLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const { authView } = this.props;

        authView.setLogin(e.target.value);
    };

    setPassword = (e: ChangeEvent<HTMLInputElement>) => {
        const { authView } = this.props;

        authView.setPassword(e.target.value);
    };

    login = () => {
        const { authService } = this.props;

        authService.loginWan();
    };

    button = (e: KeyboardEvent<HTMLInputElement>) => {
        const { authService } = this.props;
        if (e.key === constants.keys.enter) {
            authService.loginWan();
        }
    };

    render() {
        const { authorized, authView } = this.props;

        if (authorized) {
            const { from } = { from: { pathname: constants.paths.dashboard } };
            return <Redirect to={from} />;
        }

        const helperText = authView.showError ? 'Login or password incorrect' : '';
        const intent = authView.showError ? Intent.DANGER : Intent.NONE;

        return (
            <div className={styles.wrap}>
                <div className={styles.logoText} />
                <Card className={styles.card} elevation={Elevation.TWO}>
                    <FormGroup
                        label="Login"
                        labelFor="login"
                        helperText={helperText}
                        intent={intent}
                    >
                        <InputGroup
                            large
                            id="login"
                            placeholder="Login"
                            onChange={this.setLogin}
                            value={authView.login}
                            intent={intent}
                            onKeyDown={this.button}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="password"
                        helperText={helperText}
                        intent={intent}
                    >
                        <InputGroup
                            large
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={authView.password}
                            onChange={this.setPassword}
                            onKeyDown={this.button}
                            intent={intent}
                        />
                    </FormGroup>
                    <Button
                        className={styles.button}
                        large
                        fill
                        loading={authView.loading}
                        icon="user"
                        text="Log in"
                        onClick={this.login}
                    />
                </Card>
            </div>
        );
    }
}

const injected = inject(Login, x => ({
    authorized: x.viewModels.authView.authorized,
    authView: x.viewModels.authView,
    authService: x.services.authService,
}));

export default injected;
