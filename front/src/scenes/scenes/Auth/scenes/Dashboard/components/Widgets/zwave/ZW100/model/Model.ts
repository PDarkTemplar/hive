import { observable, action } from 'mobx';

import { INodeModel, NodeSizes } from '~/store/dashboard/viewModels/Types';

import constants from '~/constants';
import { serializable } from 'serializr';
import { polymorphAlias } from '~/store/dashboard/viewModels/Polymorphism';
import { FormEvent, ChangeEvent } from 'react';
import { SensorIds } from './types';
import { ScreenSize } from '~/constants/enums';

@polymorphAlias('zw100')
class Model implements INodeModel {
    sizes: NodeSizes = {
        [ScreenSize.big]: {
            width: 140,
            height: 128,
        },
        [ScreenSize.small]: {
            width: 90,
            height: 53,
        },
    };

    @serializable
    id: string;

    @serializable
    @observable
    name: string = '';

    @serializable
    uuid: string = constants.generateUUID();

    @observable
    removed: boolean = false;

    @observable
    @serializable
    selectedSensorId: SensorIds = SensorIds.Temperature;

    @observable
    @serializable
    temperatureMin: number = 10;

    @observable
    @serializable
    temperatureMax: number = 40;

    @observable
    @serializable
    humidityMin: number = 5;

    @observable
    @serializable
    humidityMax: number = 100;

    @observable
    @serializable
    luminanceMax: number = 500;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    @action.bound
    selectSensor(event: FormEvent<HTMLInputElement>) {
        this.selectedSensorId = event.currentTarget.value as SensorIds;
    }

    @action.bound
    changeTemperatureMin(val: number) {
        this.temperatureMin = val;
    }

    @action.bound
    changeTemperatureMax(val: number) {
        this.temperatureMax = val;
    }

    @action.bound
    changeHumidityMin(val: number) {
        this.humidityMin = val;
    }

    @action.bound
    changeHumidityMax(val: number) {
        this.humidityMax = val;
    }

    @action.bound
    changeLuminanceMax(val: number) {
        this.luminanceMax = val;
    }

    @action.bound
    changeName(e: ChangeEvent<HTMLInputElement>) {
        this.name = e.target.value;
    }
}

export default Model;
