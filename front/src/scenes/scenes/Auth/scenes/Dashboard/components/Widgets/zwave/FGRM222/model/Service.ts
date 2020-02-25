import { computed, reaction, action } from 'mobx';

import { INodeService } from '~/store/dashboard/viewModels/Types';
import Store from '~/store/Store';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from './types';
import constants from '~/constants';
import Model from './Model';
import { ScreenSize } from '~/constants/enums';

class Service implements INodeService {
    private store: Store;

    private modelUuid: string;

    @computed
    get batteryValue() {
        return undefined;
    }

    constructor(store: Store, modelUuid: string) {
        this.store = store;
        this.modelUuid = modelUuid;

        reaction(
            () => {
                const zwaveModel = this.getDataByNodeId;
                if (zwaveModel != null) {
                    const val = zwaveModel.values.find(
                        x => x.value_id === `${x.node_id}-${Types.Position}`
                    );
                    if (val != null) {
                        return val.value;
                    }
                    return 0;
                }
                return 0;
            },
            () => {
                const { widgets } = this.store.viewModels.dashboardView.currentPage;
                const widget = widgets.find(x => x.uuid === this.modelUuid) as Model;
                if (widget != null) widget.loading = false;
            }
        );

        reaction(
            () => this.store.viewModels.commonView.size,
            size => {
                const { widgets } = this.store.viewModels.dashboardView.currentPage;
                const widget = widgets.find(x => x.uuid === this.modelUuid);
                if (!widget) return;

                widget.noViewOpenner = size === ScreenSize.big;
            },
            {
                fireImmediately: true,
            }
        );
    }

    @computed
    get getDataByNodeId() {
        const { nodes } = this.store.viewModels.zWaveView.nodeControl;
        const { widgets } = this.store.viewModels.dashboardView.currentPage;

        const widget = widgets.find(x => x.uuid === this.modelUuid);
        if (!widget) return;

        const node = nodes.find(x => x.nodeid === Number(widget.id));
        if (!node) {
            return;
        }

        return node;
    }

    @action.bound
    setRollerPosition(zwaveModel: IZwaveNode, value: number) {
        const { mqttService } = this.store.services;
        const { widgets } = this.store.viewModels.dashboardView.currentPage;

        if (value < 0 || value > 99) return;

        const split = Types.Position.split('-').map(x => Number(x));

        const widget = widgets.find(x => x.uuid === this.modelUuid) as Model;
        if (widget != null) widget.loading = true;

        mqttService.publish(constants.mqttPathes.zwaveChangeValueRequest, {
            value: {
                node_id: zwaveModel.nodeid,
                class_id: split[0],
                instance: split[1],
                index: split[2],
                value,
            },
        });
    }

    toggle(zwaveModel: IZwaveNode, up: boolean) {
        this.setRollerPosition(zwaveModel, up ? 99 : 0);
    }

    stop(zwaveModel: IZwaveNode) {
        const { mqttService } = this.store.services;

        mqttService.publish(constants.mqttPathes.zwaveChangeValueRequest, {
            value: {
                node_id: zwaveModel.nodeid,
                class_id: 38,
                instance: 1,
                index: 2,
                value: false,
            },
        });
    }
}

export default Service;
