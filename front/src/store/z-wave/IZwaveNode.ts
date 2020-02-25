/* eslint-disable camelcase */
interface IInfo {
    manufacturer: string;
    manufacturerid: string;
    product: string;
    producttype: string;
    productid: string;
}

export interface IUpdateAssociation {
    nodeid: number;
    group: number;
    targetids: number[];
}

export interface IAssociation {
    name: string;
    max: number;
    associations: number[];
}

export interface IValue {
    type: Type;
    value_id: string;
    node_id: number;
    class_id: number;
    instance: number;
    genre: Genre;
    index: number;
    label: string;
    units: string;
    help: string;
    read_only: boolean;
    write_only: boolean;
    min: number;
    max: number;
    is_polled: boolean;
    values?: string[];
    value: number | string | boolean;
}

export enum Type {
    byte = 'byte',
    short = 'short',
    string = 'string',
    list = 'list',
    bool = 'bool',
    int = 'int',
    button = 'button',
}

export enum Genre {
    user = 'user',
    config = 'config',
    system = 'system',
}

export interface IZwaveNode {
    nodeid: number;
    name?: string;
    info: IInfo;
    values: IValue[];
    dead?: boolean;
    associations?: IAssociation[];
}
