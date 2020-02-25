import { computed } from 'mobx';

import { INodeService } from '~/store/dashboard/viewModels/Types';
import Store from '~/store/Store';
import { SensorIds } from './types';

class Service implements INodeService {
    private store: Store;

    private modelUuid: string;

    @computed
    get batteryValue() {
        const { nodes } = this.store.viewModels.zWaveView.nodeControl;
        const { widgets } = this.store.viewModels.dashboardView.currentPage;

        const widget = widgets.find(x => x.uuid === this.modelUuid);
        if (!widget) return undefined;

        const node = nodes.find(x => x.nodeid === Number(widget.id));
        if (node) {
            const value = node.values.find(x => x.value_id === `${widget.id}-${SensorIds.Battery}`);
            return value ? (value.value as number) : undefined;
        }

        return undefined;
    }

    constructor(store: Store, modelUuid: string) {
        this.store = store;
        this.modelUuid = modelUuid;
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
}

export default Service;
