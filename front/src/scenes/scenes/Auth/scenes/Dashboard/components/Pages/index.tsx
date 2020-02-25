import React, { Fragment } from 'react';

import { Intent } from '@blueprintjs/core';
import DashboardView from 'store/dashboard/viewModels/Dashboard';
import DashboardService from 'store/dashboard/services/Dashboard';
import CommonView from 'store/common/viewModels/Common';

import { inject } from 'components/Hoc';
import Alert from 'components/DialogWithButtons';

import Navigation from './Navigation';
import MobileControl from './Navigation/MobileControl';
import WidgetSelector from './WidgetSelector';

import Page from './Page';

import styles from './index.scss';

type Props = {
    common: CommonView;
    dashboard: DashboardView;
    dashboardService: DashboardService;
};

function Pages({ dashboard, dashboardService, common }: Props) {
    return (
        <Fragment>
            <div className={styles.wrap}>
                {common.isMobile && <MobileControl />}
                <Navigation isLeft />
                <Page page={dashboard.currentPage} index={dashboard.currentPageIndex} />
                <Navigation isLeft={false} />
            </div>
            <Alert
                title="Delete page"
                onClose={dashboard.closeDeletePageAlert}
                cancelText="Cancel"
                confirmText="Delete"
                onCancel={dashboard.closeDeletePageAlert}
                onConfirm={dashboard.delete}
                isOpen={dashboard.deletePageAlertOpen}
                intent={Intent.DANGER}
            >
                Are you sure you want to delete this page?
            </Alert>
            <Alert
                title="Save"
                onClose={dashboard.closeSaveConfirmation}
                cancelText="Cancel"
                confirmText="Save"
                discardText="Discard"
                onDiscard={dashboard.closeWithoutSave}
                onCancel={dashboard.closeSaveConfirmation}
                onConfirm={dashboardService.save}
                isOpen={dashboard.saveConfirmationOpen}
                intent={Intent.SUCCESS}
                discardIntent={Intent.DANGER}
            >
                Save changes?
            </Alert>
            <WidgetSelector />
        </Fragment>
    );
}

export default inject(Pages, x => ({
    dashboard: x.viewModels.dashboardView,
    dashboardService: x.services.dashboardService,
    common: x.viewModels.commonView,
}));
