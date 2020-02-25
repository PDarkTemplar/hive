import { reaction, action, when } from 'mobx';

import { serialize, deserialize } from 'serializr';
import Store from 'store/Store';

import {
    mapper as zWaveMap,
    getStaticNodes,
} from '~/scenes/scenes/Auth/scenes/Dashboard/components/Widgets';

import { NodeTypes, INodeServiceConstructor, INodeModel } from '../viewModels/Types';
import SaveData from '../viewModels/SaveData';
import mqttPathes from '~/constants/mqttPathes';

class Dashboard {
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.zwaveReaction();
        this.addStaticNodes();
        this.removedReaction();
        this.loadDashboard();
    }

    private addStaticNodes() {
        const { dashboardView } = this.store.viewModels;
        dashboardView.nodes = [...dashboardView.nodes, ...getStaticNodes()];
    }

    private loadDashboard() {
        const { dashboardView, zWaveView } = this.store.viewModels;
        const { mqttService } = this.store.services;

        mqttService.subscribe(mqttPathes.dashboardLoadResponse, result => {
            const { data } = result;
            const savedData: any = deserialize(SaveData, data);
            dashboardView.pages = (savedData as SaveData).pages;
            this.removeDeleted();
        });

        when(
            () => !!zWaveView.nodeControl.nodes.length,
            () => {
                mqttService.publish(mqttPathes.dashboardLoadRequest);
                dashboardView.loading = false;
            }
        );
    }

    @action.bound
    createService(service: INodeServiceConstructor, model: INodeModel) {
        const Service = service;
        return new Service(this.store, model.uuid);
    }

    @action.bound
    editClick() {
        const { dashboardView } = this.store.viewModels;

        if (dashboardView.edit) {
            this.closeEdit();
        } else {
            dashboardView.setEdit(true);
        }
    }

    private removedReaction() {
        const { dashboardView } = this.store.viewModels;

        reaction(
            () => {
                const widgets = dashboardView.pages.map(x => x.widgets).flat();
                const ids = dashboardView.nodes.map(x => x.id);

                return { widgets, ids };
            },
            () => this.removeDeleted()
        );
    }

    private removeDeleted() {
        const { dashboardView } = this.store.viewModels;

        const widgets = dashboardView.pages.map(x => x.widgets).flat();
        const ids = dashboardView.nodes.map(x => x.id);
        const deletedNodes = widgets.filter(x => !ids.includes(x.id));
        const existed = widgets.filter(x => ids.includes(x.id));

        existed.forEach(x => {
            x.removed = false;
        });
        deletedNodes.forEach(x => {
            x.removed = true;
        });
    }

    private zwaveReaction() {
        const { dashboardView, zWaveView } = this.store.viewModels;
        reaction(
            () =>
                zWaveView.nodeControl.nodes
                    .filter(x => !x.dead)
                    .map(x => ({
                        nodeid: x.nodeid,
                        manufacturerid: x.info.manufacturerid,
                        producttype: x.info.producttype,
                        productid: x.info.productid,
                        name: x.name || x.nodeid.toString(),
                    })),
            result => {
                const existsZwave = dashboardView.nodes.filter(x => x.type === NodeTypes.zwave);

                const existedIds = existsZwave.map(x => x.id);
                const resultIds = result.map(x => x.nodeid.toString());

                const newNodes = result.filter(x => !existedIds.includes(x.nodeid.toString()));
                const deletedNodes = existsZwave.filter(x => !resultIds.includes(x.id));

                deletedNodes.forEach(x => {
                    const index = dashboardView.nodes.findIndex(
                        n => n.id === x.id && n.type === NodeTypes.zwave
                    );
                    if (index > -1) {
                        dashboardView.nodes.splice(index, 1);
                    }
                });

                newNodes.forEach(x => {
                    const map = zWaveMap(x);
                    if (map) dashboardView.nodes.push(map);
                });
            }
        );
    }

    @action.bound
    private closeEdit() {
        const { dashboardView } = this.store.viewModels;
        if (!dashboardView.dirty) {
            dashboardView.setEdit(false);
            return;
        }

        dashboardView.saveConfirmationOpen = true;
    }

    @action.bound
    save() {
        const { dashboardView } = this.store.viewModels;
        const { mqttService } = this.store.services;

        dashboardView.saveConfirmationOpen = false;
        dashboardView.pages = dashboardView.editPages;
        dashboardView.editPages = [];

        const saveData = new SaveData(dashboardView.pages);

        const data = serialize(saveData);

        mqttService.publish(mqttPathes.dashboardSaveRequest, data);

        dashboardView.setEdit(false);
    }
}

export default Dashboard;
