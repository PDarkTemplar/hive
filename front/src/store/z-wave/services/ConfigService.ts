import { action, when } from 'mobx';

import history from '~/history';

import Store from 'store/Store';

import constants from '~/constants';
import { IZwaveNode } from '../IZwaveNode';

class ConfigService {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    @action.bound
    loadConfigData(nodeid: string) {
        const { zWaveView, commonView } = this.store.viewModels;

        if (!zWaveView.nodeLoaded) {
            commonView.loading = true;
            when(
                () => zWaveView.nodeLoaded,
                () => {
                    commonView.loading = false;
                    this.loadConfigData(nodeid);
                }
            );
        }

        const node = zWaveView.nodeControl.nodes.find(x => x.nodeid === Number(nodeid));
        if (!node) return;

        const newNode: IZwaveNode = JSON.parse(JSON.stringify(node));
        if (!newNode.name) newNode.name = '';

        zWaveView.nodeControl.config.data = newNode;
    }

    @action.bound
    private saveName() {
        const { mqttService } = this.store.services;
        const { config } = this.store.viewModels.zWaveView.nodeControl;

        const { data } = config;

        if (!data) return;

        mqttService.publish(constants.mqttPathes.zwaveNameChangeRequest, {
            name: data.name,
            nodeid: data.nodeid,
        });
    }

    @action.bound
    private saveValue(valueId: string) {
        const { mqttService } = this.store.services;
        const { config } = this.store.viewModels.zWaveView.nodeControl;

        const { data } = config;

        if (!data) return;

        const value = data.values.find(x => x.value_id === valueId);

        mqttService.publish(constants.mqttPathes.zwaveChangeValueRequest, {
            value,
        });
    }

    @action.bound
    close() {
        const { config } = this.store.viewModels.zWaveView.nodeControl;
        config.close();
    }

    @action.bound
    cancelEdit() {
        history.push(constants.paths.admin);
    }

    @action.bound
    save() {
        const { config } = this.store.viewModels.zWaveView.nodeControl;

        this.saveName();
        config.changedValues.forEach(x => this.saveValue(x));
    }
}

export default ConfigService;
