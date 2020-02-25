import React, { Component } from 'react';
import cn from 'classnames';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
    index: number;
};

class Dot extends Component<Props> {
    click = () => {
        const { index, dashboard } = this.props;
        dashboard.setIndex(index - 1);
    };

    render() {
        const { index, dashboard } = this.props;
        const dotClass = cn(styles.dot, {
            [styles.dotActive]: index - 1 === dashboard.currentPageIndex,
        });

        return <div className={dotClass} onClick={this.click} />;
    }
}

export default inject(Dot, x => ({
    dashboard: x.viewModels.dashboardView,
}));
