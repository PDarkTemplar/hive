import { action, reaction } from 'mobx';

import Store from 'store/Store';
import constants from '~/constants';
import history from '~/history';
import { IZwaveNode, IValue, IUpdateAssociation } from '~/store/z-wave/IZwaveNode';
import ConfigService from './ConfigService';

class ZWave {
    private store: Store;

    configService: ConfigService;

    constructor(store: Store) {
        this.store = store;
        this.configService = new ConfigService(store);

        this.startup();
    }

    private startup() {
        const { mqttService } = this.store.services;
        this.subscribe();
        this.checkReady();
        this.nodesReaction();

        mqttService.publish(constants.mqttPathes.zwaveGetNodesRequest);
    }

    private nodesReaction() {
        reaction(
            () =>
                this.store.viewModels.zWaveView.nodeControl.nodes.filter(x =>
                    x.values.some(v => v.class_id === 37)
                ),
            nodes => {
                this.store.viewModels.zWaveView.nodeControl.switchNodes = nodes.map(x => x.nodeid);
            },
            {
                fireImmediately: true,
            }
        );
    }

    private subscribe() {
        const { mqttService } = this.store.services;
        const { zWaveView } = this.store.viewModels;

        mqttService.subscribe(constants.mqttPathes.zwaveReadyResponse, () => {
            this.store.viewModels.zWaveView.initialized = true;
            if (this.store.viewModels.zWaveView.loading) {
                window.location.reload();
            }
        });

        mqttService.subscribe(constants.mqttPathes.zwaveAddNodeResponse, (node: IZwaveNode) => {
            zWaveView.nodeControl.addNode(node);
            this.store.viewModels.zWaveView.addNodeAlertOpen = false;
        });

        mqttService.subscribe(
            constants.mqttPathes.zwaveRemoveNodeResponse,
            ({ nodeid }: { nodeid: number }) => {
                this.store.viewModels.zWaveView.nodeControl.removeNode(nodeid);
                this.store.viewModels.zWaveView.removeNodeAlertOpen = false;
                this.store.viewModels.zWaveView.loading = false;
            }
        );

        mqttService.subscribe(constants.mqttPathes.zwaveGetNodesResponse, (nodes: IZwaveNode[]) => {
            zWaveView.nodeControl.clearNodes();
            zWaveView.nodeLoaded = true;
            nodes.forEach(node => {
                zWaveView.nodeControl.addNode(node);
            });
        });

        mqttService.subscribe(constants.mqttPathes.zwaveChangeValueResponse, (value: IValue) => {
            zWaveView.nodeControl.valueChanged(value);
            zWaveView.nodeControl.config.externalValueChanged(value);
        });

        mqttService.subscribe(
            constants.mqttPathes.zwaveUpdateNodeStatusResponse,
            ({ nodeid, dead }: { nodeid: number; dead: boolean }) => {
                zWaveView.nodeControl.statusChange(nodeid, dead);
            }
        );

        mqttService.subscribe(
            constants.mqttPathes.zwaveNameChangeResponse,
            ({ nodeid, name }: { nodeid: number; name: string }) => {
                zWaveView.nodeControl.nameChange(nodeid, name);
            }
        );

        mqttService.subscribe(
            constants.mqttPathes.zwaveAssociationUpdateResponse,
            (association: IUpdateAssociation) => {
                zWaveView.nodeControl.updateAssociation(association);
                zWaveView.nodeControl.config.externalUpdateAssociation(association);
            }
        );
    }

    @action.bound
    checkReady() {
        this.store.services.mqttService.publish(constants.mqttPathes.zwaveReadyRequest);
    }

    @action.bound
    hardReset() {
        const { zWaveView } = this.store.viewModels;
        this.store.services.mqttService.publish(constants.mqttPathes.zwaveHardReset);
        zWaveView.loading = true;
        zWaveView.closeHardResetAlert();
    }

    @action.bound
    cancelAction() {
        const { zWaveView } = this.store.viewModels;
        this.store.services.mqttService.publish(constants.mqttPathes.zwaveCancelActionRequest);
        zWaveView.closeAddNodeAlert();
        zWaveView.closeRemoveNodeAlert();
    }

    @action.bound
    addNode() {
        const { zWaveView } = this.store.viewModels;
        zWaveView.openAddNodeAlert();
        this.store.services.mqttService.publish(constants.mqttPathes.zwaveAddNodeRequest);
    }

    @action.bound
    removeNode() {
        const { zWaveView } = this.store.viewModels;
        zWaveView.openRemoveNodeAlert();
        this.store.services.mqttService.publish(constants.mqttPathes.zwaveRemoveNodeRequest);
    }

    @action.bound
    healNetwork() {
        this.store.services.mqttService.publish(constants.mqttPathes.zwaveHealNetworkRequest);
    }

    @action.bound
    removeDead(nodeid: number): any {
        const { zWaveView } = this.store.viewModels;
        zWaveView.loading = true;
        this.store.services.mqttService.publish(constants.mqttPathes.removeDeadRequest, {
            nodeid,
        });
    }

    openEdit(nodeid: number) {
        history.push(constants.paths.adminZwaveEdit.replace(':id', nodeid.toString()));
    }

    @action.bound
    forceRemove(nodeid: number) {
        const { config } = this.store.viewModels.zWaveView.nodeControl;
        this.removeDead(nodeid);
        config.closeRemoveDialog();
    }

    @action.bound
    addAssociation(group: number, targetid: number) {
        const { config } = this.store.viewModels.zWaveView.nodeControl;

        if (config.data) {
            this.store.services.mqttService.publish(
                constants.mqttPathes.zwaveAddAssociationRequest,
                { nodeid: config.data.nodeid, group, targetid }
            );
        }
    }

    @action.bound
    removeAssociation(group: number, targetid: number) {
        const { config } = this.store.viewModels.zWaveView.nodeControl;

        if (config.data) {
            this.store.services.mqttService.publish(
                constants.mqttPathes.zwaveRemoveAssociationRequest,
                { nodeid: config.data.nodeid, group, targetid }
            );
        }
    }
}

export default ZWave;
