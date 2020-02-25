import React from 'react';

import { observer } from 'mobx-react';
import { Tabs, Tab } from '@blueprintjs/core';
import Model from '../../model/Model';

import Service from '../../model/Service';

import styles from './index.scss';
import HourlyList from './HourlyList';
import FeatureList from './FeatureList';

type Props = {
    model: Model;
    service: Service | null;
};

function DialogView({ service }: Props) {
    if (!service) return null;

    const { weather, convertDate } = service.getWeather;
    if (!weather) return null;
    return (
        <div className={styles.wrap}>
            <Tabs id="Tabs" className={styles.tabs}>
                <Tab
                    id="hr"
                    title="Hourly"
                    panelClassName={styles.panel}
                    panel={<HourlyList hourly={weather.hourly.data} convertDate={convertDate} />}
                />
                <Tab
                    id="dl"
                    title="Daily"
                    panelClassName={styles.panel}
                    panel={<FeatureList feature={weather.daily.data} convertDate={convertDate} />}
                />
            </Tabs>
        </div>
    );
}

export default observer(DialogView);
