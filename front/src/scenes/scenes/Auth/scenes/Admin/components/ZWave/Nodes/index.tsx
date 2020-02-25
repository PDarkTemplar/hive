import React, { Component } from 'react';

import { inject } from 'components/Hoc';

import ZWaveView from 'store/z-wave/viewModels';
import ZwaveService from 'store/z-wave/services';

import Node from './Node';

import styles from './index.scss';

type Props = {
    model: ZWaveView;
    service: ZwaveService;
};

class Nodes extends Component<Props> {
    renderList = () => {
        const { service, model } = this.props;

        const { configurableNodes } = model.nodeControl;

        return configurableNodes.map(x => <Node key={x.nodeid} node={x} service={service} />);
    };

    render() {
        return <div className={styles.wrap}>{this.renderList()}</div>;
    }
}

const injected = inject(Nodes, x => ({
    model: x.viewModels.zWaveView,
    service: x.services.zWaveService,
}));
export default injected;
