import React, { Component } from 'react';
import cn from 'classnames';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import Dashboard from '~/store/dashboard/viewModels/Dashboard';
import { ConnectDragSource } from 'react-dnd';
import { inject } from 'components/Hoc';
import { INodeModel, INodeService } from '~/store/dashboard/viewModels/Types';
import styles from './index.scss';
import WidgetModule from './WidgetModule';

type Props = {
    dashboardView: Dashboard;
    service: INodeService | null;
    connectDragSource: ConnectDragSource;
    model: INodeModel;
    isDragging: boolean;
    onRemoveWidget: () => void;
    onOpenDrawer: () => void;
};

class Module extends Component<Props> {
    render() {
        const {
            dashboardView,
            isDragging,
            connectDragSource,
            model,
            onRemoveWidget,
            onOpenDrawer,
            service,
        } = this.props;

        const dragClass = cn(styles.draggableWrap, { [styles.hidden]: isDragging });

        return (
            <div className={dragClass}>
                {dashboardView.deleteMode && (
                    <div className={styles.removeNode} onClick={onRemoveWidget}>
                        <Icon icon={IconNames.TRASH} iconSize={42} />
                    </div>
                )}
                {model.removed && (
                    <div className={styles.removed}>
                        <Icon icon={IconNames.OFFLINE} iconSize={42} />
                    </div>
                )}
                <WidgetModule
                    connectDragSource={connectDragSource}
                    model={model}
                    onOpenDrawer={onOpenDrawer}
                    service={service}
                />
            </div>
        );
    }
}

export default inject(Module, x => ({
    dashboardView: x.viewModels.dashboardView,
}));
