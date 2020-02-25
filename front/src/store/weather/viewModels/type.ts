export interface IHourWeather {
    time: number;
    icon:
        | 'clear-day'
        | 'clear-night'
        | 'rain'
        | 'snow'
        | 'sleet'
        | 'wind'
        | 'fog'
        | 'cloudy'
        | 'partly-cloudy-day'
        | 'partly-cloudy-night';
    apparentTemperature: number;
    precipProbability: number;
    temperature: number;
    windSpeed: number;
}

export interface IDailyWeather {
    time: number;
    icon:
        | 'clear-day'
        | 'clear-night'
        | 'rain'
        | 'snow'
        | 'sleet'
        | 'wind'
        | 'fog'
        | 'cloudy'
        | 'partly-cloudy-day'
        | 'partly-cloudy-night';
    precipProbability: number;
    temperatureHigh: number;
    temperatureLow: number;
    windSpeed: number;
}

export interface IWeather {
    currently: IHourWeather;
    daily: { data: IDailyWeather[] };
    hourly: { data: IHourWeather[] };
}
