import React from 'react';
import { observer } from 'mobx-react';

import { ScreenSize } from '~/constants/enums';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    size: ScreenSize;
};

function OutSpeed({ service, size }: Props) {
    const { status } = service.getStatuses;

    if (size === ScreenSize.small) {
        return <h4 className={styles.speedSmall}>{status.speed} %</h4>;
    }

    return <h3 className={styles.speed}>{status.speed} %</h3>;
}

export default observer(OutSpeed);
