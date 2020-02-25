import { observable } from 'mobx';

import { INodeModel, NodeSizes } from '~/store/dashboard/viewModels/Types';

import constants from '~/constants';
import { serializable } from 'serializr';
import { polymorphAlias } from '~/store/dashboard/viewModels/Polymorphism';
import { ScreenSize } from '~/constants/enums';

@polymorphAlias('ventilation')
class Model implements INodeModel {
    sizes: NodeSizes = {
        [ScreenSize.big]: {
            width: 140,
            height: 200,
        },
        [ScreenSize.small]: {
            width: 90,
            height: 53,
        },
    };

    @serializable
    id: string;

    @serializable
    @observable
    name: string = 'ventilation';

    @serializable
    uuid: string = constants.generateUUID();

    @observable
    removed: boolean = false;

    @observable
    noEditOpenner?: boolean = true;

    @observable
    noViewOpenner?: boolean = true;

    constructor(id: string) {
        this.id = id;
    }
}

export default Model;
