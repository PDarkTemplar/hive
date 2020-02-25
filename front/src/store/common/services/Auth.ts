import { action, runInAction } from 'mobx';

import Store from 'store/Store';
import { LanType } from '~/constants/enums';

class Auth {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    @action
    reconnect() {
        const { authView, commonView } = this.store.viewModels;
        const { mqttService } = this.store.services;

        if (authView.lanType === LanType.lan) {
            fetch(`${LOGIN_PATH}/local-auth`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(r => r.json())
                .then(r => {
                    if (r.notLocal) {
                        runInAction(() => {
                            authView.authorized = false;
                            authView.lanType = LanType.wan;
                            commonView.loading = false;
                        });
                    } else {
                        runInAction(() => {
                            authView.authorized = true;
                        });
                        mqttService.setPassword(r.token);
                    }
                })
                .catch(() => {
                    setTimeout(() => {
                        this.loginLan();
                    }, 10000);
                });
        } else {
            authView.authorized = false;
            commonView.loading = false;
        }
    }

    @action
    loginLan() {
        const { authView, commonView } = this.store.viewModels;
        const { mqttService } = this.store.services;

        commonView.loading = true;

        fetch(`${LOGIN_PATH}/local-auth`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json())
            .then(r => {
                if (r.notLocal) {
                    runInAction(() => {
                        authView.authorized = false;
                        authView.lanType = LanType.wan;
                        commonView.loading = false;
                        commonView.initialized = true;
                    });
                } else {
                    runInAction(() => {
                        authView.authorized = true;
                        authView.lanType = LanType.lan;
                        commonView.initialized = true;
                    });
                    mqttService.connect(r.token);
                }
            })
            .catch(() => {
                setTimeout(() => {
                    this.loginLan();
                }, 10000);
            });
    }

    @action
    loginWan() {
        const { authView } = this.store.viewModels;
        const { mqttService } = this.store.services;

        authView.loading = true;

        fetch(`${LOGIN_PATH}/auth`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: authView.login, password: authView.password }),
        })
            .then(r => r.json())
            .then(r => {
                if (r.wrongLoginOrPassword) {
                    runInAction(() => {
                        authView.loading = false;
                        authView.showError = true;
                    });
                } else {
                    runInAction(() => {
                        authView.authorized = true;
                        authView.clear();
                    });
                    mqttService.connect(r.token);
                }
            })
            .catch(() => {
                authView.loading = false;
            });
    }
}

export default Auth;
