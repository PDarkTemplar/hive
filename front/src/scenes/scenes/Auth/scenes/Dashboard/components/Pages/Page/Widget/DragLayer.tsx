import React, { Component } from 'react';

import { DragLayer, XYCoord } from 'react-dnd';

import DashboardService from '~/store/dashboard/services/Dashboard';
import DashboardView from '~/store/dashboard/viewModels/Dashboard';
import { INodeModel, INodeService } from '~/store/dashboard/viewModels/Types';
import { DragType } from '~/constants/enums';

import styles from './index.scss';
import WidgetModule from './WidgetModule';

const noop = () => {};

type Props = {
    dragItem?: { model: INodeModel };
    itemType?: string;
    currentOffset?: XYCoord;
    isDragging?: boolean;
    dashboardService: DashboardService;
    dashboardView: DashboardView;
};

function getItemStyles(props: Props) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none',
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
    };
}

class WidgetDragLayer extends Component<Props> {
    service: INodeService | null = null;

    componentDidUpdate() {
        const { dragItem, dashboardView, dashboardService } = this.props;

        if (!dragItem) return;

        const widget = dashboardView.findNode(dragItem.model.id);
        if (!widget) return;

        if (widget.service && !this.service) {
            this.service = dashboardService.createService(widget.service, dragItem.model);
        }
    }

    render() {
        const { dragItem, itemType, isDragging } = this.props;

        if (!dragItem || !itemType) return null;

        if (!isDragging || itemType !== DragType.DashboardWidget) {
            return null;
        }

        const layerStyles: React.CSSProperties = {
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 100,
            left: 0,
            top: 0,
        };

        return (
            <div style={layerStyles}>
                <div style={getItemStyles(this.props)} className={styles.draggableWrap}>
                    <WidgetModule
                        service={this.service}
                        model={dragItem.model}
                        onOpenDrawer={noop}
                    />
                </div>
            </div>
        );
    }
}

export default DragLayer<Props>(monitor => ({
    dragItem: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
}))(WidgetDragLayer);
