import { observable, action } from 'mobx';

import { INodeModel, NodeSizes } from '~/store/dashboard/viewModels/Types';

import constants from '~/constants';
import { serializable } from 'serializr';
import { polymorphAlias } from '~/store/dashboard/viewModels/Polymorphism';
import { ChangeEvent } from 'react';
import { ScreenSize } from '~/constants/enums';

@polymorphAlias('fgd212')
class Model implements INodeModel {
    sizes: NodeSizes = {
        [ScreenSize.big]: {
            width: 140,
            height: 128,
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
    name: string = '';

    @serializable
    uuid: string = constants.generateUUID();

    @observable
    removed: boolean = false;

    @observable
    noViewOpenner?: boolean = true;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    @action.bound
    changeName(e: ChangeEvent<HTMLInputElement>) {
        this.name = e.target.value;
    }
}

export default Model;
