import React from 'react';
import { observer } from 'mobx-react';

import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    id: number;
    service: Service;
};

function OutSpeed({ service, id }: Props) {
    const view = service.getStatuses;

    const status = view.getData(id);

    if (!status) return null;

    const fanSpeed = status.fan === 0 ? 'auto' : status.fan;

    return <h4 className={styles.speedSmall}>{fanSpeed}</h4>;
}

export default observer(OutSpeed);
