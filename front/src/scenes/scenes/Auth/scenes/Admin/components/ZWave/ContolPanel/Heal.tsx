import React, { Component, Fragment } from 'react';

import Icon from 'assets/heal.svg';
import { inject } from 'components/Hoc';
import ModuleWrap from 'components/ModuleWrap';

import ZWaveService from 'store/z-wave/services';

import styles from './index.scss';

type Props = {
    service: ZWaveService;
};

class Heal extends Component<Props> {
    render() {
        const { service } = this.props;

        return (
            <Fragment>
                <ModuleWrap onClick={service.healNetwork} className={styles.card}>
                    <div className={styles.iconWrap}>
                        <Icon width={48} height={48} />
                    </div>
                    <span>Heal</span>
                </ModuleWrap>
            </Fragment>
        );
    }
}

const injected = inject(Heal, x => ({
    service: x.services.zWaveService,
}));

export default injected;
