import { observable } from 'mobx';
import { IWeather } from './type';

class Weather {
    @observable
    weather?: IWeather;

    convertDate(unixTimestamp: number) {
        return new Date(unixTimestamp * 1000);
    }
}

export default Weather;
