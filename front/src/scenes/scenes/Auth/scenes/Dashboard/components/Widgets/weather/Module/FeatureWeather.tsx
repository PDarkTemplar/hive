import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import { IDailyWeather } from '~/store/weather/viewModels/type';

import FeatureText from './FeatureText';

type Props = {
    weather: IDailyWeather;
    convertDate: (unix: number) => Date;
};

class FeatureWeather extends Component<Props> {
    render() {
        const { weather, convertDate } = this.props;
        return (
            <div className={styles.wrap}>
                <Icon size={ScreenSize.big} icon={weather.icon} />
                <div className={styles.text}>
                    <FeatureText weather={weather} convertDate={convertDate} />
                </div>
            </div>
        );
    }
}

export default observer(FeatureWeather);
