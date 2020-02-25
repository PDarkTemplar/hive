import { action } from 'mobx';
import Store from '~/store/Store';

import constants from '~/constants';
import { IStatus, Action } from '../viewModels/types';

class Media {
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.subscribe();

        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.mediaAllRequest);
    }

    private subscribe() {
        const { mqttService } = this.store.services;
        const { mediaView } = this.store.viewModels;

        mqttService.subscribe(constants.mqttPathes.mediaAllResponse, (status: IStatus) => {
            mediaView.data = status;
        });

        mqttService.subscribe(constants.mqttPathes.mediaResponse, (status: IStatus) => {
            mediaView.data = status;
        });
    }

    @action
    setAction(mediaAction: Action) {
        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.mediaRequest, { action: mediaAction });
    }
}

export default Media;
