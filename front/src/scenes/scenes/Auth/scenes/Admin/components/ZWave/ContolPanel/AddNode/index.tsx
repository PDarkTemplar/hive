import React, { Component, Fragment } from 'react';

import { Intent } from '@blueprintjs/core';

import { inject } from 'components/Hoc';
import ModuleWrap from 'components/ModuleWrap';
import Dialog from '~/components/DialogWithButtons';

import ZWaveService from 'store/z-wave/services';
import ZWaveViewModel from 'store/z-wave/viewModels';

import Icon from 'assets/plus.svg';

import Content from './Content';

import styles from './index.scss';

type Props = {
    service: ZWaveService;
    model: ZWaveViewModel;
};

class AddNode extends Component<Props> {
    render() {
        const { service, model } = this.props;

        return (
            <Fragment>
                <ModuleWrap onClick={service.addNode} className={styles.card}>
                    <div className={styles.iconWrap}>
                        <Icon width={48} height={48} />
                    </div>
                    <span>Add node</span>
                </ModuleWrap>
                <Dialog
                    isOpen={model.addNodeAlertOpen}
                    onClose={service.cancelAction}
                    title="Add device"
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

const injected = inject(AddNode, x => ({
    model: x.viewModels.zWaveView,
    service: x.services.zWaveService,
}));

export default injected;
