import React, { ReactNode } from 'react';

import { FormGroup } from '@blueprintjs/core';

import { IValue } from 'store/z-wave/IZwaveNode';

type Props = {
    value: IValue;
    children: ReactNode;
    noLabel: boolean;
};

function InputCore({ value, children, noLabel }: Props) {
    const units = value.units ? ` (${value.units})` : '';
    const label = !noLabel ? `${value.label}${units}` : '';
    return (
        <FormGroup label={label} labelFor={value.value_id} helperText={value.help}>
            {children}
        </FormGroup>
    );
}

InputCore.defaultProps = {
    noLabel: false,
};

export default InputCore;
