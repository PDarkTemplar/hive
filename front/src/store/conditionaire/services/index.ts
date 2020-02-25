import { action } from 'mobx';
import Store from '~/store/Store';

import constants from '~/constants';
import { IStatuses, Mode } from '../viewModels/types';

class Conditionaire {
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.subscribe();

        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.conditionaireAllRequest);
    }

    private subscribe() {
        const { mqttService } = this.store.services;
        const { conditionaireView } = this.store.viewModels;

        mqttService.subscribe(
            constants.mqttPathes.conditionaireAllResponse,
            (statuses: IStatuses[]) => {
                conditionaireView.data = statuses.map(x => ({ ...x, powerChange: false }));
            }
        );

        mqttService.subscribe(constants.mqttPathes.conditionaireResponse, (status: IStatuses) => {
            conditionaireView.data.forEach(x => {
                if (x.id === status.id) {
                    x.enabled = status.enabled;
                    x.fan = status.fan;
                    x.loading = status.loading;
                    x.mode = status.mode;
                    x.temperature = status.temperature;
                }
            });
        });
    }

    @action
    setPower(id: number, enabled: boolean) {
        const { mqttService } = this.store.services;
        const { conditionaireView } = this.store.viewModels;

        const status = conditionaireView.data.find(x => x.id === id) as IStatuses;
        status.enabled = enabled;
        status.powerChange = true;

        mqttService.publish(constants.mqttPathes.conditionaireRequest, status);

        status.powerChange = false;
    }

    @action
    setSpeed(id: number, speed: number) {
        const { mqttService } = this.store.services;
        const { conditionaireView } = this.store.viewModels;

        const status = conditionaireView.data.find(x => x.id === id) as IStatuses;
        status.fan = speed;

        mqttService.publish(constants.mqttPathes.conditionaireRequest, status);
    }

    @action
    setTemperature(id: number, temperature: number) {
        const { mqttService } = this.store.services;
        const { conditionaireView } = this.store.viewModels;

        const status = conditionaireView.data.find(x => x.id === id) as IStatuses;

        status.temperature = temperature;

        mqttService.publish(constants.mqttPathes.conditionaireRequest, status);
    }

    @action
    setMode(id: number, mode: Mode) {
        const { mqttService } = this.store.services;
        const { conditionaireView } = this.store.viewModels;

        const status = conditionaireView.data.find(x => x.id === id) as IStatuses;

        status.mode = mode;

        mqttService.publish(constants.mqttPathes.conditionaireRequest, status);
    }
}

export default Conditionaire;
