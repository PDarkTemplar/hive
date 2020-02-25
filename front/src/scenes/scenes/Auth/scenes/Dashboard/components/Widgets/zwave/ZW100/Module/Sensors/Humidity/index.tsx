import React from 'react';
import { observer } from 'mobx-react';

import Model from '../../../model/Model';
import { IValue } from '~/store/z-wave/IZwaveNode';

import Drop from './Drop';
import ValueRender from '../ValueRender';
import Wave from './Wave';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    value: IValue;
    model: Model;
    size: ScreenSize;
};

function Temperature({ value, model, size }: Props) {
    const valueNumber = value.value as number;

    return (
        <div className={styles.wrap}>
            <Wave size={size} model={model} valueNumber={valueNumber} />
            <div>
                <Drop size={size} />
            </div>
            <div>
                <ValueRender size={size}>{valueNumber} %</ValueRender>
            </div>
        </div>
    );
}

export default observer(Temperature);
