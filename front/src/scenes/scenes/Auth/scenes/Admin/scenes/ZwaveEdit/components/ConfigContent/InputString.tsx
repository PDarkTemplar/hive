import React, { Component, ChangeEvent } from 'react';
import { observer } from 'mobx-react';

import { InputGroup } from '@blueprintjs/core';

import { IValue } from 'store/z-wave/IZwaveNode';
import Config from '~/store/z-wave/viewModels/Config';
import InputCore from './InputCore';

type Props = {
    value: IValue;
    config: Config;
};

class InputString extends Component<Props> {
    change = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, config } = this.props;

        config.changeValue(value.value_id, e.target.value);
    };

    render() {
        const { value } = this.props;

        return (
            <InputCore value={value}>
                <InputGroup
                    id={value.value_id}
                    placeholder={value.label}
                    onChange={this.change}
                    value={value.value as string}
                />
            </InputCore>
        );
    }
}

export default observer(InputString);
