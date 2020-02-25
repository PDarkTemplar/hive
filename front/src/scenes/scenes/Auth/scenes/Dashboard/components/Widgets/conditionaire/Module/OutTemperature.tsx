import React from 'react';
import { observer } from 'mobx-react';

import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    id: number;
};

function OutTemperature({ service, id }: Props) {
    const view = service.getStatuses;

    const status = view.getData(id);

    if (!status) return null;

    return <h4 className={styles.temperatureSmall}>{status.temperature}&#176; C</h4>;
}

export default observer(OutTemperature);
