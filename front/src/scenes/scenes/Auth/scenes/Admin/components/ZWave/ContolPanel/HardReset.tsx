import React, { Component, Fragment } from 'react';
import { Intent } from '@blueprintjs/core';

import Icon from 'assets/reload-kill.svg';
import { inject } from 'components/Hoc';
import ModuleWrap from 'components/ModuleWrap';
import Dialog from '~/components/DialogWithButtons';

import ZWaveService from 'store/z-wave/services';
import ZWaveViewModel from 'store/z-wave/viewModels';

import styles from './index.scss';

type Props = {
    service: ZWaveService;
    model: ZWaveViewModel;
};

class HardReset extends Component<Props> {
    render() {
        const { service, model } = this.props;

        return (
            <Fragment>
                <ModuleWrap onClick={model.openHardResetAlert} className={styles.card}>
                    <div className={styles.iconWrap}>
                        <Icon width={48} height={48} />
                    </div>
                    <span>Hard reset</span>
                </ModuleWrap>
                <Dialog
                    isOpen={model.hardResetAlertOpen}
                    title="Hard reset"
                    iconClass={styles.smallIcon}
                    onClose={model.closeHardResetAlert}
                    cancelText="Cancel"
                    confirmText="Reset"
                    intent={Intent.DANGER}
                    onCancel={model.closeHardResetAlert}
                    onConfirm={service.hardReset}
                >
                    <p>Are you sure you want to hard reset?</p>
                    <p>All node info will be removed. UI would reload.</p>
                </Dialog>
            </Fragment>
        );
    }
}

const injected = inject(HardReset, x => ({
    model: x.viewModels.zWaveView,
    service: x.services.zWaveService,
}));

export default injected;
