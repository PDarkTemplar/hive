import { NodeTypes } from '~/store/dashboard/viewModels/Types';
import { ZwaveDashboardShortNodeType } from '~/store/dashboard/viewModels/IZwaveDashboardNode';

class BaseWidget {
    id: string;

    name: string;

    type: NodeTypes = NodeTypes.zwave;

    removed: boolean = false;

    constructor(node: ZwaveDashboardShortNodeType) {
        this.id = node.nodeid.toString();
        this.name = node.name;
    }
}

export default BaseWidget;
