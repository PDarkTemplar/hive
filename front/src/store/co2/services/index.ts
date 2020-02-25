import Store from '~/store/Store';

import constants from '~/constants';
import { IData } from '../viewModels/types';

class Co2 {
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.subscribe();

        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.co2AllRequest);
    }

    private subscribe() {
        const { mqttService } = this.store.services;
        const { co2View } = this.store.viewModels;

        mqttService.subscribe(constants.mqttPathes.co2AllResponse, (datas: IData[]) => {
            co2View.data = datas;
        });

        mqttService.subscribe(constants.mqttPathes.co2InterfaceResponse, (data: IData) => {
            co2View.data.forEach(x => {
                if (x.index === data.index) {
                    x.co2 = data.co2;
                }
            });
        });
    }
}

export default Co2;
