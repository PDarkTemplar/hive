import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
    DragSource,
    DropTarget,
    ConnectDragSource,
    ConnectDropTarget,
    DragSourceMonitor,
    DropTargetMonitor,
    ConnectDragPreview,
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import DashboardService from '~/store/dashboard/services/Dashboard';
import DashboardView from '~/store/dashboard/viewModels/Dashboard';
import CommonView from '~/store/common/viewModels/Common';
import { INodeModel, INodeService } from '~/store/dashboard/viewModels/Types';
import { DragType } from '~/constants/enums';

import styles from './index.scss';
import Module from './Module';

type Props = {
    model: INodeModel;
    dashboardService: DashboardService;
    dashboardView: DashboardView;
    commonView: CommonView;
};

type WidgetSourceCollectedProps = {
    connectDragPreview: ConnectDragPreview;
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
};

type WidgetTargetCollectedProps = {
    connectDropTarget: ConnectDropTarget;
};

const widgetSource = {
    beginDrag(props: Props) {
        return {
            model: props.model,
            id: props.model.uuid,
            originalIndex: props.dashboardView.currentPage.findWidgetIndex(props.model.uuid),
        };
    },

    endDrag(props: Props, monitor: DragSourceMonitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.dashboardView.currentPage.moveWidget(droppedId, originalIndex);
        }
    },
};

const widgetTarget = {
    canDrop() {
        return false;
    },

    hover(props: Props, monitor: DropTargetMonitor) {
        const { id: draggedId } = monitor.getItem();
        const overId = props.model.uuid;

        if (draggedId !== overId) {
            const overIndex = props.dashboardView.currentPage.findWidgetIndex(overId);
            props.dashboardView.currentPage.moveWidget(draggedId, overIndex);
        }
    },
};

class Widget extends Component<Props & WidgetSourceCollectedProps & WidgetTargetCollectedProps> {
    service: INodeService | null = null;

    constructor(props: Props & WidgetSourceCollectedProps & WidgetTargetCollectedProps) {
        super(props);

        const { model, dashboardService, dashboardView } = props;

        const widget = dashboardView.findNode(model.id);
        if (!widget) return;

        if (widget.service) {
            this.service = dashboardService.createService(widget.service, model);
        }
    }

    componentDidMount() {
        const { connectDragPreview } = this.props;

        if (connectDragPreview) {
            connectDragPreview(getEmptyImage(), {
                captureDraggingState: true,
            });
        }
    }

    removeWidget = () => {
        const { model, dashboardView } = this.props;

        dashboardView.currentPage.removeWidget(model.uuid);
    };

    selectDrawer = () => {
        const { model, dashboardView } = this.props;

        const widget = dashboardView.findNode(model.id);
        if (!widget) return null;

        let Comp = widget.dialogViewComponent;

        if (dashboardView.edit) {
            Comp = widget.dialogEditComponent;
        }

        return <Comp model={model} service={this.service} />;
    };

    openDrawer = () => {
        const { dashboardView, model } = this.props;

        if (
            (dashboardView.edit && !model.noEditOpenner) ||
            (!dashboardView.edit && !model.noViewOpenner)
        )
            dashboardView.openDrawer(this.selectDrawer());
    };

    render() {
        const { model, isDragging, connectDragSource, connectDropTarget } = this.props;

        const timeout = { enter: 500, exit: 500 };

        return (
            <TransitionGroup component={null}>
                <CSSTransition
                    timeout={timeout}
                    classNames={{
                        appear: styles.appear,
                        appearActive: styles.appearActive,
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                    appear
                >
                    {connectDropTarget(
                        <div>
                            <Module
                                service={this.service}
                                connectDragSource={connectDragSource}
                                isDragging={isDragging}
                                model={model}
                                onRemoveWidget={this.removeWidget}
                                onOpenDrawer={this.openDrawer}
                            />
                        </div>
                    )}
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default DropTarget<Props, WidgetTargetCollectedProps>(
    DragType.DashboardWidget,
    widgetTarget,
    connect => ({
        connectDropTarget: connect.dropTarget(),
    })
)(
    DragSource<Props, WidgetSourceCollectedProps>(
        DragType.DashboardWidget,
        widgetSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging(),
        })
    )(observer(Widget))
);
