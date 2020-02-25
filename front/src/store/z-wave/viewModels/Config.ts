import { observable, action, computed } from 'mobx';

import { IZwaveNode, IValue, IUpdateAssociation } from '../IZwaveNode';

class Config {
    @observable
    data?: IZwaveNode;

    changedValues: string[] = [];

    @observable
    removeOpened: boolean = false;

    @action.bound
    close() {
        this.data = undefined;
        this.changedValues = [];
    }

    @action.bound
    setName(name: string) {
        const data = this.data as IZwaveNode;
        data.name = name;
    }

    @action.bound
    changeValue(valueId: string, value: string | number | boolean) {
        const internalValue = (this.data as IZwaveNode).values.find(x => x.value_id === valueId);
        if (internalValue) {
            if (!this.changedValues.some(x => x === valueId)) {
                this.changedValues.push(valueId);
            }

            internalValue.value = value;
        }
    }

    @action.bound
    externalValueChanged(value: IValue) {
        const node = this.data as IZwaveNode;
        if (!node || node.nodeid !== value.node_id) return;
        const valueIndex = node.values.findIndex(x => x.value_id === value.value_id);

        if (valueIndex < -1) return;

        node.values[valueIndex] = value;
    }

    @action.bound
    externalUpdateAssociation(association: IUpdateAssociation) {
        const node = this.data as IZwaveNode;
        if (!node || node.nodeid !== association.nodeid || !node.associations) return;

        const group = node.associations[association.group];
        if (!group) return;

        group.associations = association.targetids;
    }

    @computed
    get dialogName() {
        if (this.data) {
            return this.data.name
                ? this.data.name
                : `${this.data.info.manufacturerid.replace(
                      '0x',
                      ''
                  )}:${this.data.info.producttype.replace(
                      '0x',
                      ''
                  )}:${this.data.info.productid.replace('0x', '')}`;
        }
        return '';
    }

    @action.bound
    openRemoveDialog() {
        this.removeOpened = true;
    }

    @action.bound
    closeRemoveDialog() {
        this.removeOpened = false;
    }
}

export default Config;
