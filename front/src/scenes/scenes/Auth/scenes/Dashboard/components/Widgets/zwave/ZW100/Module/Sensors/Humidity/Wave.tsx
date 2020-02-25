import React from 'react';
import cn from 'classnames';

import Model from '../../../model/Model';
import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    valueNumber: number;
    size: ScreenSize;
};

function Wave({ model, valueNumber, size }: Props) {
    const backgroundClass = cn(styles.background, {
        [styles.low]: valueNumber <= model.humidityMin,
        [styles.height]: valueNumber >= model.humidityMax,
    });

    const delta = size === ScreenSize.big ? 170 : 120;

    let percentage = delta - (((valueNumber - 5) * 100) / (100 - 5)) * 1.3;

    if (!Number.isFinite(percentage) || Number.isNaN(percentage)) {
        percentage = valueNumber;
    }

    const style = {
        transform: `translateY(${percentage}px)`,
    };

    return (
        <div className={styles.waveWrap}>
            <svg style={style} xmlns="http://www.w3.org/2000/svg" className={backgroundClass}>
                <path
                    className={styles.wave}
                    d="M29.382 0C17.758 0 11.735 5.909 0 5.932v251.98h233.954V5.933C222.145 5.932 209.732 0 204.572 0c-11.707 0-17.206 5.955-28.83 5.932C164.117 5.909 157.984 0 146.359 0c-11.624 0-17.648 5.909-29.382 5.932C105.168 5.932 92.755 0 87.595 0c-11.707 0-17.206 5.955-28.83 5.932C47.14 5.909 41.006 0 29.382 0z"
                />
            </svg>
        </div>
    );
}

export default Wave;
