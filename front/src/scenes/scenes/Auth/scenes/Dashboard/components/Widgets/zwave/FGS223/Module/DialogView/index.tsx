import React from 'react';

import { observer } from 'mobx-react';
import Model from '../../model/Model';

import Service from '../../model/Service';

import Big from '../Big';

import styles from './index.scss';
import ModuleWrap, { Size } from '~/components/ModuleWrap';

type Props = {
    model: Model;
    service: Service | null;
};

function DialogView({ model, service }: Props) {
    return (
        <div className={styles.wrap}>
            <ModuleWrap size={Size.none} className={styles.module}>
                <Big model={model} service={service} />
            </ModuleWrap>
        </div>
    );
}

export default observer(DialogView);
