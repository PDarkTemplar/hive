import { observable, action } from 'mobx';

import { LanType } from '~/constants/enums';

class Auth {
    @observable
    authorized: boolean = false;

    @observable
    lanType: LanType = LanType.none;

    @observable
    login: string = '';

    @observable
    password: string = '';

    @observable
    loading: boolean = false;

    @observable
    showError: boolean = false;

    @action
    clear() {
        this.login = '';
        this.password = '';
        this.loading = false;
        this.showError = false;
    }

    @action
    setLogin(login: string) {
        this.login = login;
        this.showError = false;
    }

    @action
    setPassword(password: string) {
        this.password = password;
        this.showError = false;
    }
}

export default Auth;
