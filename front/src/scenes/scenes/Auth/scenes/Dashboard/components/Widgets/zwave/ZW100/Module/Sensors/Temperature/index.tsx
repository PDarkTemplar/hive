import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import Model from '../../../model/Model';
import { IValue } from '~/store/z-wave/IZwaveNode';

import Thermometr from './Thermometr';
import ValueRender from '../ValueRender';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    value: IValue;
    model: Model;
    size: ScreenSize;
};

function Temperature({ value, model, size }: Props) {
    const valueNumber = value.value as number;

    const backgroundClass = cn(styles.background, {
        [styles.low]: valueNumber <= model.temperatureMin,
        [styles.height]: valueNumber >= model.temperatureMax,
    });

    return (
        <div className={styles.wrap}>
            <div className={backgroundClass} />
            <div className={styles.innerWrap}>
                <Thermometr size={size} value={valueNumber} />
                <ValueRender size={size}>{valueNumber}&#176; C</ValueRender>
            </div>
        </div>
    );
}

export default observer(Temperature);
