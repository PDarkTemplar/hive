import { StatelessComponent, ComponentClass } from 'react';
import {
    INode,
    INodeModelConstructor,
    AddProps,
    INodeServiceConstructor,
    WidgetProps,
} from '~/store/dashboard/viewModels/Types';

import BaseWidget from '../../model/BaseWidget';
import AddWidget from '../AddWidget';

import SmallComponent from '../Module/Small';
import BigComponent from '../Module/Big';
import DialogEditComponent from '../Module/DialogEdit';
import Model from './Model';

import Service from './Service';

class Widget extends BaseWidget implements INode {
    model: INodeModelConstructor = Model;

    manufacturerid: string = '0x013c';

    producttype: string = '0x0002';

    productid: string = '0x001e';

    addWidget: StatelessComponent<AddProps> = AddWidget;

    service: INodeServiceConstructor = Service;

    smallComponent: StatelessComponent<WidgetProps<Model>> = SmallComponent;

    bigComponent: StatelessComponent<WidgetProps<Model>> = BigComponent;

    dialogEditComponent: ComponentClass<WidgetProps<Model>> = DialogEditComponent;

    dialogViewComponent: StatelessComponent<WidgetProps<Model>> = () => {
        return null;
    };
}

export default Widget;
