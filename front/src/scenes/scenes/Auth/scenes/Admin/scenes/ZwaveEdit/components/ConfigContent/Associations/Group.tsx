import React, { Component } from 'react';

import { inject } from 'components/Hoc';

import { ItemRenderer, MultiSelect } from '@blueprintjs/select';

import { Label, MenuItem } from '@blueprintjs/core';
import { IAssociation } from '~/store/z-wave/IZwaveNode';
import ZwaveService from '~/store/z-wave/services';

type Props = {
    association: IAssociation;
    group: number;
    nodeids: number[];
    serivce: ZwaveService;
};

const AssociationMultiSelect = MultiSelect.ofType<number>();

class Group extends Component<Props> {
    tagRenderer = (value: number) => {
        return value;
    };

    private isSelected = (val: number) => {
        const { association } = this.props;

        return association.associations.some(x => x === val);
    };

    private renderItem: ItemRenderer<number> = (value, { modifiers, handleClick }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                icon={this.isSelected(value) ? 'tick' : 'blank'}
                key={value}
                text={value.toString()}
                onClick={handleClick}
                shouldDismissPopover={false}
            />
        );
    };

    private handleTagRemove = (value: string) => {
        const { serivce, group } = this.props;

        serivce.removeAssociation(group, Number(value));
    };

    private handleSelect = (value: number) => {
        const { association, serivce, group } = this.props;
        if (association.max > association.associations.length) {
            serivce.addAssociation(group, value);
        }
    };

    render() {
        const { association, nodeids } = this.props;

        const fullNodes = [...nodeids, 1];

        return (
            <Label>
                {association.name}
                <AssociationMultiSelect
                    items={fullNodes}
                    selectedItems={association.associations}
                    itemRenderer={this.renderItem}
                    tagRenderer={this.tagRenderer}
                    onItemSelect={this.handleSelect}
                    tagInputProps={{ onRemove: this.handleTagRemove }}
                />
            </Label>
        );
    }
}

export default inject(Group, x => ({
    nodeids: x.viewModels.zWaveView.nodeControl.switchNodes,
    serivce: x.services.zWaveService,
}));
