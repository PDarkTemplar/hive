import { observable, action, computed } from 'mobx';
import { IZwaveNode, IValue, IUpdateAssociation } from '../IZwaveNode';
import Config from './Config';

class NodeControl {
    @observable
    nodes: IZwaveNode[] = [];

    @observable
    switchNodes: number[] = [];

    config: Config = new Config();

    @computed
    get configurableNodes() {
        return this.nodes.filter(x => x.nodeid !== 1);
    }

    @action.bound
    addNode(node: IZwaveNode) {
        if (this.nodes.some(x => x.nodeid === node.nodeid)) return;
        this.nodes.push(node);
    }

    @action.bound
    removeNode(id: number) {
        const index = this.nodes.findIndex(x => x.nodeid === id);

        if (index > -1) {
            this.nodes.splice(index, 1);
        }
    }

    @action.bound
    clearNodes() {
        this.nodes = [];
    }

    @action.bound
    valueChanged(value: IValue) {
        const node = this.nodes.find(x => x.nodeid === value.node_id);
        if (!node) return;
        const valueIndex = node.values.findIndex(x => x.value_id === value.value_id);

        if (valueIndex < -1) return;

        node.values[valueIndex] = value;
    }

    @action.bound
    updateAssociation(association: IUpdateAssociation) {
        const node = this.nodes.find(x => x.nodeid === association.nodeid);
        if (!node || !node.associations) return;

        const group = node.associations[association.group];
        if (!group) return;

        group.associations = association.targetids;
    }

    @action.bound
    statusChange(nodeid: number, dead: boolean) {
        const node = this.nodes.find(x => x.nodeid === nodeid);
        if (!node) return;

        node.dead = dead;
    }

    @action.bound
    nameChange(nodeid: number, name: string) {
        const node = this.nodes.find(x => x.nodeid === nodeid);
        if (!node) return;

        node.name = name;
    }
}

export default NodeControl;
