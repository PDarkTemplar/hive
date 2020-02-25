import React, { Component, Fragment } from 'react';
import ModuleWrap, { Size } from '~/components/ModuleWrap';
import Dashboard from '~/store/dashboard/viewModels/Dashboard';
import { ConnectDragSource } from 'react-dnd';
import { Spinner, Intent } from '@blueprintjs/core';
import { inject } from 'components/Hoc';
import DragHandle from './DragHandle';
import { INodeModel, INodeService } from '~/store/dashboard/viewModels/Types';
import Battery from './Battery';
import { ScreenSize } from '~/constants/enums';
import Common from '~/store/common/viewModels/Common';
import WidgetComponent from './WidgetComponent';
import styles from './index.scss';

type Props = {
    dashboardView: Dashboard;
    commonView: Common;
    service: INodeService | null;
    connectDragSource?: ConnectDragSource | undefined;
    model: INodeModel;
    onOpenDrawer: () => void;
};

class Module extends Component<Props> {
    generateWidgetSize = () => {
        const { commonView, model } = this.props;

        let style = {
            height: model.sizes.small.height,
            minWidth: model.sizes.small.width,
        };

        if (commonView.size === ScreenSize.big) {
            style = {
                height: model.sizes.big.height,
                minWidth: model.sizes.big.width,
            };
        }

        return style;
    };

    renderHandle = () => {
        const { connectDragSource } = this.props;

        if (connectDragSource) {
            return connectDragSource(
                <div>
                    <DragHandle />
                </div>
            );
        }
        return <DragHandle />;
    };

    render() {
        const { dashboardView, model, onOpenDrawer, service } = this.props;

        const batteryValue = service ? service.batteryValue : undefined;

        return (
            <Fragment>
                {dashboardView.edit && !dashboardView.deleteMode && this.renderHandle()}
                <ModuleWrap size={Size.none} className={styles.module} onClick={onOpenDrawer}>
                    <div className={styles.header}>
                        {model.name}
                        {model.loading && (
                            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_SMALL} />
                        )}
                    </div>
                    <div style={this.generateWidgetSize()} className={styles.widget}>
                        <WidgetComponent service={service} model={model} />
                    </div>
                    <div className={styles.footer}>
                        <div />
                        <Battery value={batteryValue} />
                    </div>
                </ModuleWrap>
            </Fragment>
        );
    }
}

export default inject(Module, x => ({
    dashboardView: x.viewModels.dashboardView,
    commonView: x.viewModels.commonView,
}));
