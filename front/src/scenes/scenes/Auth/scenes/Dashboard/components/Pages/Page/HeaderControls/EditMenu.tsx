import React, { Component } from 'react';

import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
};

class EditMenu extends Component<Props> {
    deleteMode = () => {
        const { dashboard } = this.props;

        dashboard.setDeleteMode(true);
    };

    render() {
        const { dashboard } = this.props;

        if (!dashboard.edit || dashboard.deleteMode) return null;
        return (
            <div className={styles.menu}>
                <Button icon={IconNames.LAYOUT_AUTO} onClick={dashboard.openAddWidget} />
                <Button icon={IconNames.DOCUMENT} onClick={dashboard.add} />
                <Button intent={Intent.DANGER} icon={IconNames.TRASH} onClick={this.deleteMode} />
            </div>
        );
    }
}

export default inject(EditMenu, x => ({
    dashboard: x.viewModels.dashboardView,
}));
