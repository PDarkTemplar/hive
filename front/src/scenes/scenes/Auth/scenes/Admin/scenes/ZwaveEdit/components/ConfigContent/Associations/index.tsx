import React, { Component } from 'react';

import { inject } from 'components/Hoc';

import Config from '~/store/z-wave/viewModels/Config';

import styles from './index.scss';
import Group from './Group';

type Props = {
    config: Config;
};

class AssociationsList extends Component<Props> {
    renderList = () => {
        const {
            config: { data },
        } = this.props;

        if (!data || !data.associations) return null;

        return data.associations.map((x, i) => (
            <Group key={x.name} association={x} group={i + 1} />
        ));
    };

    render() {
        const {
            config: { data },
        } = this.props;

        if (!data || !data.associations) return null;

        return (
            <div className={styles.wrap}>
                <h3>Associations</h3>
                {this.renderList()}
            </div>
        );
    }
}

const injected = inject(AssociationsList, x => ({
    config: x.viewModels.zWaveView.nodeControl.config,
}));

export default injected;
