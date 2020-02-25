import { computed, reaction, action } from 'mobx';

import { INodeService } from '~/store/dashboard/viewModels/Types';
import Store from '~/store/Store';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from './types';
import constants from '~/constants';

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
    setLevel(zwaveModel: IZwaveNode, value: number) {
        const { mqttService } = this.store.services;

        if (value < 0 || value > 99) return;

        const split = Types.Level.split('-').map(x => Number(x));

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

    toggle(zwaveModel: IZwaveNode, on: boolean) {
        this.setLevel(zwaveModel, !on ? 50 : 0);
    }
}

export default Service;
