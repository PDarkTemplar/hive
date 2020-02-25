import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { IDailyWeather } from '~/store/weather/viewModels/type';

type Props = {
    weather: IDailyWeather;
    convertDate: (unix: number) => Date;
};

function FeatureText({ weather, convertDate }: Props) {
    return (
        <Fragment>
            <h3>{convertDate(weather.time).toLocaleString()}</h3>
            <h3>
                {weather.temperatureLow.toFixed(0)}&#176; C - {weather.temperatureHigh.toFixed(0)}
                &#176; C
            </h3>
            <h3>{weather.windSpeed} km / h</h3>
            <h3>{(weather.precipProbability * 100).toFixed(0)}%</h3>
        </Fragment>
    );
}

export default observer(FeatureText);
