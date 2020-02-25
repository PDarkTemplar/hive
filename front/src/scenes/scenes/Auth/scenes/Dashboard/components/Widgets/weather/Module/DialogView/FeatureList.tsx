import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { IDailyWeather } from '~/store/weather/viewModels/type';

import FeatureWeather from '../FeatureWeather';

import styles from './index.scss';
import ModuleWrap, { Size } from '~/components/ModuleWrap';

type Props = {
    feature: IDailyWeather[];
    convertDate: (unix: number) => Date;
};

class FeatureList extends Component<Props> {
    renderList = () => {
        const { convertDate, feature } = this.props;

        return feature.map(x => (
            <ModuleWrap size={Size.none} key={x.time} className={styles.module}>
                <FeatureWeather weather={x} convertDate={convertDate} />
            </ModuleWrap>
        ));
    };

    render() {
        return this.renderList();
    }
}

export default observer(FeatureList);
