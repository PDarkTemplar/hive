import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { IValue } from '~/store/z-wave/IZwaveNode';

import ValueRender from '../ValueRender';
import Model from '../../../model/Model';
import LuminanceIcon from './LuminanceIcon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    value: IValue;
    model: Model;
    size: ScreenSize;
};

function Luminance({ value, size, model }: Props) {
    const valueNumber = value.value as number;

    const iconWrapClass = cn(styles.iconWrap, {
        [styles.iconWrapSmall]: size === ScreenSize.small,
    });

    return (
        <div className={styles.wrap}>
            <div className={iconWrapClass}>
                <LuminanceIcon maxLum={model.luminanceMax} size={size} value={valueNumber} />
            </div>
            <div>
                <ValueRender size={size}>{valueNumber} Lx</ValueRender>
            </div>
        </div>
    );
}

export default observer(Luminance);
