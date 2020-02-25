import { ComponentClass, StatelessComponent } from 'react';
import Store from 'store/Store';
import { ScreenSize } from '~/constants/enums';

export type AddProps = {
    name: string;
};

export type WidgetProps<T extends INodeModel> = {
    model: T;
    service: any | null;
    edit?: boolean;
};

export enum NodeTypes {
    zwave = 'zwave',
    ventilation = 'ventilation',
    media = 'media',
    conditionare = 'conditionare',
    co2 = 'co2',
}

export interface INodeServiceConstructor {
    new (store: Store, modelUUID: string): INodeService;
}

export interface INodeModelConstructor {
    new (id: string, name: string): INodeModel;
}

export interface INodeService {
    batteryValue?: number;
}

export interface INodeModel {
    sizes: NodeSizes;
    name: string;
    id: string;
    uuid: string;
    removed: boolean;
    loading?: boolean;
    noEditOpenner?: boolean;
    noViewOpenner?: boolean;
}

export type NodeSize = {
    width: number;
    height: number;
};

export type NodeSizes = {
    [ScreenSize.big]: NodeSize;
    [ScreenSize.small]: NodeSize;
};

export interface INode {
    id: string;
    type: NodeTypes;
    name: string;
    addWidget: ComponentClass<AddProps> | StatelessComponent<AddProps>;
    model: INodeModelConstructor;
    service?: INodeServiceConstructor;
    smallComponent: ComponentClass<WidgetProps<any>> | StatelessComponent<WidgetProps<any>>;
    bigComponent: ComponentClass<WidgetProps<any>> | StatelessComponent<WidgetProps<any>>;
    dialogEditComponent: ComponentClass<WidgetProps<any>> | StatelessComponent<WidgetProps<any>>;
    dialogViewComponent: ComponentClass<WidgetProps<any>> | StatelessComponent<WidgetProps<any>>;
}
