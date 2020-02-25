import React, { Component } from 'react';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import Dot from './Dot';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
};

class Dots extends Component<Props> {
    renderDots = () => {
        const { dashboard } = this.props;

        const result = [];

        for (let i = 1; dashboard.totalPages >= i; i += 1) {
            result.push(<Dot key={i} index={i} />);
        }

        return result;
    };

    render() {
        return <div className={styles.dotsWrap}>{this.renderDots()}</div>;
    }
}

export default inject(Dots, x => ({
    dashboard: x.viewModels.dashboardView,
}));
