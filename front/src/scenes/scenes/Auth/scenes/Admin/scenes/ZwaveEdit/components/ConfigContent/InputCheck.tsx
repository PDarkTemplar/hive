import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Switch } from '@blueprintjs/core';

import { IValue } from 'store/z-wave/IZwaveNode';
import Config from '~/store/z-wave/viewModels/Config';
import InputCore from './InputCore';

type Props = {
    value: IValue;
    config: Config;
};

class InputNumber extends Component<Props> {
    change = () => {
        const { value, config } = this.props;

        config.changeValue(value.value_id, !(value.value as boolean));
    };

    render() {
        const { value } = this.props;

        return (
            <InputCore value={value} noLabel>
                <Switch
                    checked={value.value as boolean}
                    label={value.label}
                    onChange={this.change}
                />
            </InputCore>
        );
    }
}

export default observer(InputNumber);
