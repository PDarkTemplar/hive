import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Select, ItemRenderer } from '@blueprintjs/select';

import { MenuItem, Button } from '@blueprintjs/core';
import { IValue } from 'store/z-wave/IZwaveNode';
import Config from '~/store/z-wave/viewModels/Config';
import InputCore from './InputCore';

const StringSelect = Select.ofType<string>();

type Props = {
    value: IValue;
    config: Config;
};

class InputSelect extends Component<Props> {
    select = (item: string) => {
        const { value, config } = this.props;

        config.changeValue(value.value_id, item);
    };

    renderItem: ItemRenderer<string> = (item, { handleClick, index, modifiers }) => (
        <MenuItem active={modifiers.active} key={index} onClick={handleClick} text={item} />
    );

    render() {
        const { value } = this.props;

        const items = (value.values as string[]).slice();
        const selected = value.value as string;

        return (
            <InputCore value={value}>
                <StringSelect
                    filterable={false}
                    items={items}
                    activeItem={selected}
                    itemRenderer={this.renderItem}
                    onItemSelect={this.select}
                    noResults={<MenuItem disabled text="No results." />}
                >
                    <Button text={selected} rightIcon="double-caret-vertical" />
                </StringSelect>
            </InputCore>
        );
    }
}

export default observer(InputSelect);
