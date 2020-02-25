import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { ScreenSize } from '~/constants/enums';
import { IHourWeather } from '~/store/weather/viewModels/type';

import CurrentWeather from '../CurrentWeather';

import styles from './index.scss';
import ModuleWrap, { Size } from '~/components/ModuleWrap';

type Props = {
    hourly: IHourWeather[];
    convertDate: (unix: number) => Date;
};

class HourlyList extends Component<Props> {
    renderList = () => {
        const { convertDate, hourly } = this.props;

        return hourly.map(x => (
            <ModuleWrap key={x.time} size={Size.none} className={styles.module}>
                <CurrentWeather
                    size={ScreenSize.big}
                    weather={x}
                    showTime
                    convertDate={convertDate}
                />
            </ModuleWrap>
        ));
    };

    render() {
        return this.renderList();
    }
}

export default observer(HourlyList);
