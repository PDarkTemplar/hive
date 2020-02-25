import { observable } from 'mobx';
import { IAllStatuses } from './IStatuses';

class Ventilation {
    @observable
    status: IAllStatuses = {
        enabled: false,
        speed: 10,
        temperature: 5,
        settedSpeed: 10,
        settedTemperature: 5,
    };
}

export default Ventilation;
