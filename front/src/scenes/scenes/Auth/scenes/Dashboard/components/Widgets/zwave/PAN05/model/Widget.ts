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
import BigComponent from '../Module/Big';
import SmallComponent from '../Module/Small';
import DialogViewComponent from '../Module/DialogView';
import DialogEditComponent from '../Module/DialogEdit';

import Model from './Model';

import Service from './Service';

class Widget extends BaseWidget implements INode {
    model: INodeModelConstructor = Model;

    manufacturerid: string = '0x013c';

    producttype: string = '0x0001';

    productid: string = '0x0010';

    addWidget: StatelessComponent<AddProps> = AddWidget;

    service: INodeServiceConstructor = Service;

    smallComponent: ComponentClass<WidgetProps<Model>> = SmallComponent;

    bigComponent: ComponentClass<WidgetProps<Model>> = BigComponent;

    dialogEditComponent: ComponentClass<WidgetProps<Model>> = DialogEditComponent;

    dialogViewComponent: StatelessComponent<WidgetProps<Model>> = DialogViewComponent;
}

export default Widget;
