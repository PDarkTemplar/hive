import React from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from '../model/types';

import styles from './index.scss';

type Props = {
    zwaveModel: IZwaveNode;
};

function Position({ zwaveModel }: Props) {
    const positionParam = zwaveModel.values.find(
        x => x.value_id === `${x.node_id}-${Types.Position}`
    );

    const position = positionParam ? Number(positionParam.value) : 0;

    return <h4 className={styles.position}>{position} %</h4>;
}

export default observer(Position);
