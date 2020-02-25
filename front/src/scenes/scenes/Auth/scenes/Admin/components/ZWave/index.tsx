import React, { Component } from 'react';

import ZWaveService from 'store/z-wave/services';
import { inject } from 'components/Hoc';

import ZWaveView from 'store/z-wave/viewModels';

import { Tab } from '../CarouselVertical';
import ControlPanel from './ContolPanel';
import Nodes from './Nodes';

import styles from './index.scss';

type Props = {
    model: ZWaveView;
    service: ZWaveService;
};

class ZWave extends Component<Props> {
    render() {
        const { model, service } = this.props;

        return (
            <Tab
                visible
                name="ZWave"
                iconClass={styles.tabIcon}
                isDefault
                loading={model.loading}
                loadingWithRetry={!model.initialized}
                retryTimeout={10000}
                retryCallback={service.checkReady}
            >
                <ControlPanel />
                <Nodes />
            </Tab>
        );
    }
}

const injected = inject(ZWave, x => ({
    model: x.viewModels.zWaveView,
    service: x.services.zWaveService,
}));
export default injected;
