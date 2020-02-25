import { observable, action } from 'mobx';
import NodeControl from './NodeCotrol';

class ZWave {
    @observable
    initialized: boolean = false;

    @observable
    loading: boolean = false;

    @observable
    nodeLoaded: boolean = false;

    @observable
    hardResetAlertOpen: boolean = false;

    @observable
    addNodeAlertOpen: boolean = false;

    @observable
    removeNodeAlertOpen: boolean = false;

    nodeControl: NodeControl = new NodeControl();

    @action.bound
    openHardResetAlert() {
        this.hardResetAlertOpen = true;
    }

    @action.bound
    closeHardResetAlert() {
        this.hardResetAlertOpen = false;
    }

    @action.bound
    openAddNodeAlert() {
        this.addNodeAlertOpen = true;
    }

    @action.bound
    closeAddNodeAlert() {
        this.addNodeAlertOpen = false;
    }

    @action.bound
    openRemoveNodeAlert() {
        this.removeNodeAlertOpen = true;
    }

    @action.bound
    closeRemoveNodeAlert() {
        this.removeNodeAlertOpen = false;
    }
}

export default ZWave;
