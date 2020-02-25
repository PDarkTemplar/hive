import React, { Component, Fragment } from 'react';

import { Intent } from '@blueprintjs/core';

import { inject } from 'components/Hoc';
import ModuleWrap from 'components/ModuleWrap';
import Dialog from '~/components/DialogWithButtons';

import ZWaveService from 'store/z-wave/services';
import ZWaveViewModel from 'store/z-wave/viewModels';

import Icon from 'assets/minus.svg';

import Content from './Content';

import styles from './index.scss';

type Props = {
    service: ZWaveService;
    model: ZWaveViewModel;
};

class RemoveNode extends Component<Props> {
    render() {
        const { service, model } = this.props;

        return (
            <Fragment>
                <ModuleWrap onClick={service.removeNode} className={styles.card}>
                    <div className={styles.iconWrap}>
                        <Icon width={48} height={48} />
                    </div>
                    <span>Remove node</span>
                </ModuleWrap>
                <Dialog
                    isOpen={model.removeNodeAlertOpen}
                    onClose={service.cancelAction}
                    title="Remove device"
                    confirmText="Stop"
                    iconClass={styles.smallIcon}
                    onConfirm={service.cancelAction}
                    intent={Intent.PRIMARY}
                >
                    <Content onTime={service.cancelAction} />
                </Dialog>
            </Fragment>
        );
    }
}

const injected = inject(RemoveNode, x => ({
    model: x.viewModels.zWaveView,
    service: x.services.zWaveService,
}));

export default injected;
