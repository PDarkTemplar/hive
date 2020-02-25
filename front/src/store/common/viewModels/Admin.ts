import { observable, action } from 'mobx';

class Admin {
    @observable
    openTabIndex: number = -1;

    @action.bound
    setTab(index: number) {
        if (this.openTabIndex === index) {
            this.openTabIndex = -1;
        } else {
            this.openTabIndex = index;
        }
    }
}

export default Admin;
