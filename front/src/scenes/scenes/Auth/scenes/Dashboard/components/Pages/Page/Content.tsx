import React, { Component, Fragment } from 'react';
import { DropTarget, ConnectDropTarget } from 'react-dnd';
import FlipMove from 'react-flip-move';

import DashboardService from '~/store/dashboard/services/Dashboard';
import DashboardView from '~/store/dashboard/viewModels/Dashboard';
import CommonView from '~/store/common/viewModels/Common';
import { Drawer } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { inject } from 'components/Hoc';

import Widget from './Widget';
import DragLayer from './Widget/DragLayer';

import styles from './index.scss';
import { DragType } from '~/constants/enums';

type Props = {
    dashboardView: DashboardView;
    dashboardService: DashboardService;
    commonView: CommonView;
    connectDropTarget: ConnectDropTarget;
};

const widgetTarget = {
    drop() {
        //
    },
};

class Content extends Component<Props> {
    componentWillUnmount() {
        const { dashboardView } = this.props;
        dashboardView.pages.forEach(x => x.cancelFrame);
    }

    renderWidgets = () => {
        const { dashboardView, dashboardService, commonView } = this.props;
        const { currentPage: page } = dashboardView;

        return (
            <FlipMove
                typeName={null}
                onStart={page.flipStart}
                onFinish={page.flipFinish}
                enterAnimation="none"
            >
                {page.widgets.map(x => (
                    <Widget
                        key={x.uuid}
                        model={x}
                        dashboardService={dashboardService}
                        commonView={commonView}
                        dashboardView={dashboardView}
                    />
                ))}
            </FlipMove>
        );
    };

    render() {
        const { connectDropTarget, dashboardService, commonView, dashboardView } = this.props;
        return (
            <Fragment>
                <Drawer
                    title="Options"
                    icon={IconNames.PAPERCLIP}
                    isOpen={dashboardView.drawerOpen}
                    onClose={dashboardView.closeDrawer}
                    vertical={commonView.isPortrait}
                >
                    {dashboardView.drawerComponent}
                </Drawer>
                <DragLayer dashboardService={dashboardService} dashboardView={dashboardView} />
                {connectDropTarget(
                    <div className={styles.contentWrap}>{this.renderWidgets()}</div>
                )}
            </Fragment>
        );
    }
}

const injected = inject(Content, x => ({
    dashboardView: x.viewModels.dashboardView,
    dashboardService: x.services.dashboardService,
    commonView: x.viewModels.commonView,
}));

export default DropTarget(DragType.DashboardWidget, widgetTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(injected);
