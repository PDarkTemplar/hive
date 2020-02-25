import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { ScreenSize } from '~/constants/enums';

import { IHourWeather } from '~/store/weather/viewModels/type';

type Props = {
    weather: IHourWeather;
    convertDate: (unix: number) => Date;
    size: ScreenSize;
    showTime: boolean;
};

function CurrentText({ weather, size, convertDate, showTime }: Props) {
    if (size === ScreenSize.small) {
        return (
            <Fragment>
                <h4>{weather.temperature.toFixed(0)}&#176; C</h4>
            </Fragment>
        );
    }

    return (
        <Fragment>
            {showTime && <h3>{convertDate(weather.time).toLocaleString()}</h3>}
            <h3>
                {weather.apparentTemperature.toFixed(0)}&#176; C / {weather.temperature.toFixed(0)}
                &#176; C
            </h3>
            <h3>{weather.windSpeed} km / h</h3>
            <h3>{(weather.precipProbability * 100).toFixed(0)}%</h3>
        </Fragment>
    );
}

export default observer(CurrentText);
