import Store from '~/store/Store';
import constants from '~/constants';
import { IAllStatuses } from '../viewModels/IStatuses';

class Ventilation {
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.subscribe();

        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.ventilationAllStatusRequest);
    }

    private subscribe() {
        const { mqttService } = this.store.services;
        const { ventilationView } = this.store.viewModels;

        mqttService.subscribe(
            constants.mqttPathes.ventilationAllStatusResponse,
            (statuses: IAllStatuses) => {
                ventilationView.status = statuses;
            }
        );

        mqttService.subscribe(
            constants.mqttPathes.ventilationStatusResponse,
            (status: IAllStatuses) => {
                if (status.enabled != null) {
                    ventilationView.status.enabled = status.enabled;
                }

                if (status.speed != null) {
                    ventilationView.status.speed = status.speed;
                }

                if (status.temperature != null) {
                    ventilationView.status.temperature = status.temperature;
                }

                if (status.settedSpeed != null) {
                    ventilationView.status.settedSpeed = status.settedSpeed;
                }

                if (status.settedTemperature != null) {
                    ventilationView.status.settedTemperature = status.settedTemperature;
                }
            }
        );
    }

    setPower(enabled: boolean) {
        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.ventilationSetPowerRequest, {
            value: enabled ? 1 : 0,
        });
    }

    setSpeed(speed: number) {
        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.ventilationSetFanSpeedRequest, {
            value: speed,
        });
    }

    setTemperature(temperature: number) {
        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.ventilationSetTemperatureRequest, {
            value: temperature,
        });
    }
}

export default Ventilation;
