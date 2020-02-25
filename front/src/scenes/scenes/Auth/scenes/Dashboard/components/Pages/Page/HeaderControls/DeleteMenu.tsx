import React, { Component, Fragment } from 'react';

import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
};

class DeleteMenu extends Component<Props> {
    deleteMode = () => {
        const { dashboard } = this.props;

        dashboard.setDeleteMode(false);
    };

    renderDelete = () => {
        const { dashboard } = this.props;

        if (dashboard.canDeletePage) {
            return (
                <Button
                    intent={Intent.DANGER}
                    icon={IconNames.TRASH}
                    onClick={dashboard.openDeletePageAlert}
                />
            );
        }

        return null;
    };

    render() {
        const { dashboard } = this.props;

        if (!dashboard.edit || !dashboard.deleteMode) return null;
        return (
            <Fragment>
                <div className={styles.menu}>
                    <Button icon={IconNames.UNDO} onClick={this.deleteMode} />
                    {this.renderDelete()}
                </div>
            </Fragment>
        );
    }
}

export default inject(DeleteMenu, x => ({
    dashboard: x.viewModels.dashboardView,
}));
