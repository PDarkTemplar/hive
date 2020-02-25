import React, { Component, ChangeEvent } from 'react';

import { FormGroup, InputGroup } from '@blueprintjs/core';

import { inject } from 'components/Hoc';

import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import Config from 'store/z-wave/viewModels/Config';

import InputList from './InputList';
import Associations from './Associations';

import styles from './index.scss';

type Props = {
    config: Config;
    node?: IZwaveNode;
};

class ConfigContent extends Component<Props> {
    setName = (e: ChangeEvent<HTMLInputElement>) => {
        const { config } = this.props;

        config.setName(e.target.value);
    };

    render() {
        const { node } = this.props;

        if (!node) return null;

        const name = `${node.info.manufacturer} - ${node.info.product}`;

        return (
            <div className={styles.wrap}>
                <div className={styles.nameWrap}>
                    <h3>{name}</h3>
                </div>
                <FormGroup label="Name" labelFor="name">
                    <InputGroup
                        id="name"
                        placeholder="Name"
                        onChange={this.setName}
                        value={node.name}
                    />
                </FormGroup>
                <InputList />
                <Associations />
            </div>
        );
    }
}

const injected = inject(ConfigContent, x => ({
    config: x.viewModels.zWaveView.nodeControl.config,
    node: x.viewModels.zWaveView.nodeControl.config.data,
}));

export default injected;
