import { computed, reaction } from 'mobx';

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

    toggle(zwaveModel: IZwaveNode) {
        const { mqttService } = this.store.services;
        const enabledParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Enable}`
        );

        if (enabledParam) {
            mqttService.publish(constants.mqttPathes.zwaveChangeValueRequest, {
                value: {
                    node_id: zwaveModel.nodeid,
                    class_id: enabledParam.class_id,
                    instance: enabledParam.instance,
                    index: enabledParam.index,
                    value: !enabledParam.value,
                },
            });
        }
    }
}

export default Service;
