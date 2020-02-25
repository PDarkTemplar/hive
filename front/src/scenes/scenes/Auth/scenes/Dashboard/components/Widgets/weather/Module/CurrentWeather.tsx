import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import { IHourWeather } from '~/store/weather/viewModels/type';
import CurrentText from './CurrentText';

type Props = {
    weather: IHourWeather;
    convertDate: (unix: number) => Date;
    size: ScreenSize;
    showTime: boolean;
};

class CurrentWeather extends Component<Props> {
    render() {
        const { size, weather, convertDate, showTime } = this.props;
        return (
            <div className={styles.wrap}>
                <Icon size={size} icon={weather.icon} />
                <div className={styles.text}>
                    <CurrentText
                        weather={weather}
                        size={size}
                        showTime={showTime}
                        convertDate={convertDate}
                    />
                </div>
            </div>
        );
    }
}

export default observer(CurrentWeather);
