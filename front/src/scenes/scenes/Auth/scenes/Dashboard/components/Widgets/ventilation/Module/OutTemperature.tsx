import React from 'react';
import { observer } from 'mobx-react';

import { ScreenSize } from '~/constants/enums';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    size: ScreenSize;
};

function OutTemperature({ service, size }: Props) {
    const { status } = service.getStatuses;

    if (size === ScreenSize.small) {
        return <h4 className={styles.temperatureSmall}>{status.temperature}&#176; C</h4>;
    }

    return <h3 className={styles.temperature}>{status.temperature}&#176; C</h3>;
}

export default observer(OutTemperature);
