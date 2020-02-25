import React from 'react';
import { Button } from '@blueprintjs/core';

import { inject } from 'components/Hoc';
import Dialog from 'components/Dialog';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import Content from './Content';

import styles from './index.scss';

type Props = {
    dashboard: DashboardView;
};

function WidgetSelector({ dashboard }: Props) {
    return (
        <Dialog
            className={styles.dialog}
            isOpen={dashboard.addWidgetOpen}
            onClose={dashboard.closeAddWidget}
            title="Add widget"
            canEscapeKeyClose
            canOutsideClickClose
            isCloseButtonShown
        >
            <div className={styles.contentWrap}>
                <Content />
                <div className={styles.buttonWrap}>
                    <Button onClick={dashboard.closeAddWidget}>Close</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default inject(WidgetSelector, x => ({
    dashboard: x.viewModels.dashboardView,
}));
