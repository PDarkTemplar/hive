import React from 'react';
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
        x => x.value_id === `${x.node_id}-${SensorIds.Leakage}`
    );

    const wrapClass = cn(styles.icon, { [styles.iconSmall]: size === ScreenSize.small });
    const dropClass = cn(styles.drop, { [styles.leak]: binaryParam && !!binaryParam.value });

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={wrapClass} viewBox="0 0 480 480">
            <path
                className={dropClass}
                d="M240 145.92l-6.584 9.536C229.176 161.6 192 216.104 192 240c.026 26.499 21.501 47.974 48 48 26.499-.026 47.974-21.501 48-48 0-23.896-37.176-78.4-41.416-84.544zM240 272c-17.673 0-32-14.327-32-32 0-12.288 17.6-43.408 32-65.6 14.4 22.184 32 53.304 32 65.6 0 17.673-14.327 32-32 32z"
            />
            <path d="M168 0v64h-32v48h16v32h16v32a8 8 0 0 1-8 8h-16v-16h-32v-16H64v32H0v144h64v32h48v-16h32v-16h88.064v-33.871L260.248 328H336v16h32v16h48v-32h64V184h-64v-32h-48v16h-32v16h-16a8 8 0 0 1-8-8v-32h16v-32h16V64h-32V0z" />
        </svg>
    );
}

export default observer(Sensor);
