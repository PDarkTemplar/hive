import { IWeather } from '../viewModels/type';
import Store from '~/store/Store';
import constants from '~/constants';

class Weather {
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.subscribe();

        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.weatherRequest);
    }

    private subscribe() {
        this.store.services.mqttService.subscribe(
            constants.mqttPathes.weatherResponse,
            (result: IWeather) => {
                this.store.viewModels.weatherView.weather = result;
            }
        );
    }
}

export default Weather;
