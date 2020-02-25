import React from 'react';

import { Button, Intent } from '@blueprintjs/core';

import { IconNames } from '@blueprintjs/icons';
import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';
import DashboardService from 'store/dashboard/services/Dashboard';

import EditMenu from './EditMenu';
import DeleteMenu from './DeleteMenu';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
    dashboardService: DashboardService;
};

function HeaderControls({ dashboardService }: Props) {
    return (
        <div className={styles.wrap}>
            <div>
                <Button
                    icon={IconNames.EDIT}
                    intent={Intent.PRIMARY}
                    onClick={dashboardService.editClick}
                />
            </div>
            <EditMenu />
            <DeleteMenu />
        </div>
    );
}

export default inject(HeaderControls, x => ({
    dashboard: x.viewModels.dashboardView,
    dashboardService: x.services.dashboardService,
}));
