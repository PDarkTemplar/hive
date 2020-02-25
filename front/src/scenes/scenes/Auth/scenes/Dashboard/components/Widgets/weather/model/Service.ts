import { computed } from 'mobx';

import { INodeService } from '~/store/dashboard/viewModels/Types';
import Store from '~/store/Store';

class Service implements INodeService {
    private store: Store;

    @computed
    get batteryValue() {
        return undefined;
    }

    constructor(store: Store) {
        this.store = store;
    }

    @computed
    get getWeather() {
        return this.store.viewModels.weatherView;
    }
}

export default Service;
