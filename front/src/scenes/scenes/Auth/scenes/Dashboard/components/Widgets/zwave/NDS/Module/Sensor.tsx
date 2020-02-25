import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { ScreenSize } from '~/constants/enums';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { SensorIds } from '../model/types';

import styles from './index.scss';

type Props = {
    size: ScreenSize;
    zwaveModel: IZwaveNode;
};

function Sensor({ size, zwaveModel }: Props) {
    const binaryParam = zwaveModel.values.find(
        x => x.value_id === `${x.node_id}-${SensorIds.Open}`
    );

    const wrapOpenClass = cn(styles.icon, styles.iconOpen, {
        [styles.iconSmall]: size === ScreenSize.small,
        [styles.open]: binaryParam && !!binaryParam.value,
    });

    const wrapCloseClass = cn(styles.icon, styles.iconClosed, {
        [styles.iconSmall]: size === ScreenSize.small,
        [styles.closed]: !binaryParam || !binaryParam.value,
    });

    return (
        <Fragment>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492.5 492.5"
                className={wrapOpenClass}
            >
                <path d="M184.646 0v21.72H99.704v433.358h31.403V53.123h53.539V492.5l208.15-37.422V37.5L184.646 0zm38.292 263.129c-6.997 0-12.67-7.381-12.67-16.486 0-9.104 5.673-16.485 12.67-16.485s12.67 7.381 12.67 16.485c0 9.105-5.673 16.486-12.67 16.486z" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 435.789 435.789"
                className={wrapCloseClass}
            >
                <path d="M369.21 435.789c-6.68 0-12.105-5.426-12.105-12.104V24.21H78.684v399.474c0 6.679-5.423 12.104-12.105 12.104s-12.105-5.426-12.105-12.104V12.105C54.474 5.423 59.897 0 66.579 0H369.21c6.679 0 12.104 5.423 12.104 12.105v411.579c.001 6.679-5.425 12.105-12.104 12.105zM341.973 45.395v378.289H93.816V45.395h248.157zm-187.631 192.17c0-10.863-7.451-19.67-16.645-19.67-9.194 0-16.645 8.807-16.645 19.67 0 10.864 7.451 19.672 16.645 19.672 9.194 0 16.645-8.808 16.645-19.672z" />
            </svg>
        </Fragment>
    );
}

export default observer(Sensor);
