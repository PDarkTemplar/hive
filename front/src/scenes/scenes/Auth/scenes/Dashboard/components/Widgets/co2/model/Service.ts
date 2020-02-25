import { computed, reaction } from 'mobx';

import { INodeService } from '~/store/dashboard/viewModels/Types';
import Store from '~/store/Store';
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
    get getView() {
        return this.store.viewModels.co2View;
    }
}

export default Service;
