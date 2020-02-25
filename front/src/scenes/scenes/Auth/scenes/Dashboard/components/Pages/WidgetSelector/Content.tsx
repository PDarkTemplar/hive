import React, { Component } from 'react';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels//Dashboard';

import Widget from './Widget';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
};

class Content extends Component<Props> {
    renderItems = () => {
        const { dashboard } = this.props;

        return dashboard.nodes.map(x => {
            const Node = x.addWidget;
            return (
                <Widget key={x.id} model={x.model} id={x.id} name={x.name}>
                    <Node name={x.name} />
                </Widget>
            );
        });
    };

    render() {
        return <div className={styles.content}>{this.renderItems()}</div>;
    }
}

export default inject(Content, x => ({
    dashboard: x.viewModels.dashboardView,
}));
