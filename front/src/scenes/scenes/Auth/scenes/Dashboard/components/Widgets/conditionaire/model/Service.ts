import { computed, reaction, runInAction } from 'mobx';

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

        reaction(
            () => {
                return this.store.viewModels.conditionaireView.data.map(x => ({
                    id: x.id,
                    loading: x.loading,
                }));
            },
            data => {
                const { widgets } = this.store.viewModels.dashboardView.currentPage;
                const widget = widgets.find(x => x.uuid === this.modelUuid);
                if (!widget) return;

                if (data) {
                    const meta = data.find(x => x.id === Number(widget.id.replace('c', '')));

                    if (meta) {
                        widget.loading = meta.loading;
                    }
                }
            }
        );
    }

    getService() {
        return this.store.services.conditionaireService;
    }

    @computed
    get getStatuses() {
        return this.store.viewModels.conditionaireView;
    }
}

export default Service;
