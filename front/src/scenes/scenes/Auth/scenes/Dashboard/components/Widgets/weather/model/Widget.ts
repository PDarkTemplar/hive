import { StatelessComponent, ComponentClass } from 'react';
import {
    INode,
    INodeModelConstructor,
    AddProps,
    INodeServiceConstructor,
    WidgetProps,
    NodeTypes,
} from '~/store/dashboard/viewModels/Types';

import AddWidget from '../AddWidget';
import BigComponent from '../Module/Big';
import SmallComponent from '../Module/Small';

import DialogViewComponent from '../Module/DialogView';

import Model from './Model';

import Service from './Service';

class Widget implements INode {
    id: string = 'weather';

    name: string = 'weather';

    type: NodeTypes = NodeTypes.ventilation;

    removed: boolean = false;

    model: INodeModelConstructor = Model;

    addWidget: StatelessComponent<AddProps> = AddWidget;

    service: INodeServiceConstructor = Service;

    smallComponent: ComponentClass<WidgetProps<Model>> = SmallComponent;

    bigComponent: ComponentClass<WidgetProps<Model>> = BigComponent;

    dialogEditComponent: StatelessComponent<WidgetProps<Model>> = () => {
        return null;
    };

    dialogViewComponent: StatelessComponent<WidgetProps<Model>> = DialogViewComponent;
}

export default Widget;
