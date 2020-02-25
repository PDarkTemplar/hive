import React, { Component } from 'react';

import { inject } from 'components/Hoc';

import { Type, Genre } from 'store/z-wave/IZwaveNode';
import Config from '~/store/z-wave/viewModels/Config';

import InputString from './InputString';
import InputNumber from './InputNumber';
import InputSelect from './InputSelect';
import InputCheck from './InputCheck';

import styles from './index.scss';

type Props = {
    config: Config;
};

class InputList extends Component<Props> {
    renderList = () => {
        const { config } = this.props;

        const { data } = config;

        if (!data) return null;

        return data.values
            .filter(
                x =>
                    !x.read_only &&
                    (x.genre === Genre.config ||
                        (x.genre === Genre.system && x.value_id === `${x.node_id}-132-1-0`))
            )
            .map(x => {
                switch (x.type) {
                    case Type.string:
                        return <InputString key={x.value_id} value={x} config={config} />;
                    case Type.byte:
                    case Type.int:
                    case Type.short:
                        return <InputNumber key={x.value_id} value={x} config={config} />;
                    case Type.list:
                        return <InputSelect key={x.value_id} value={x} config={config} />;
                    case Type.bool:
                        return <InputCheck key={x.value_id} value={x} config={config} />;
                    default:
                        return null;
                }
            });
    };

    render() {
        const list = this.renderList();
        if (!list) return null;

        const half = list.length / 2;

        return (
            <div className={styles.settingsWrap}>
                <div className={styles.row}>{list.slice(0, half)}</div>
                <div className={styles.row}>{list.slice(half)}</div>
            </div>
        );
    }
}

const injected = inject(InputList, x => ({
    config: x.viewModels.zWaveView.nodeControl.config,
}));

export default injected;
