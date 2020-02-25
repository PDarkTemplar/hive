import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { NumericInput } from '@blueprintjs/core';

import { IValue } from 'store/z-wave/IZwaveNode';
import Config from '~/store/z-wave/viewModels/Config';
import InputCore from './InputCore';

type Props = {
    value: IValue;
    config: Config;
};

class InputNumber extends Component<Props> {
    change = (internalValue: number) => {
        const { value, config } = this.props;

        config.changeValue(value.value_id, internalValue);
    };

    render() {
        const { value } = this.props;

        return (
            <InputCore value={value}>
                <NumericInput
                    value={value.value as number}
                    min={value.min}
                    max={value.max}
                    clampValueOnBlur
                    onValueChange={this.change}
                />
            </InputCore>
        );
    }
}

export default observer(InputNumber);
