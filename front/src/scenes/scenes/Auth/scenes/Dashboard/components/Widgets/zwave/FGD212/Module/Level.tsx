import React from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from '../model/types';

import styles from './index.scss';

type Props = {
    zwaveModel: IZwaveNode;
};

function Level({ zwaveModel }: Props) {
    const levelParam = zwaveModel.values.find(x => x.value_id === `${x.node_id}-${Types.Level}`);

    const level = levelParam ? Number(levelParam.value) : 0;

    return <h4 className={styles.level}>{level} %</h4>;
}

export default observer(Level);
