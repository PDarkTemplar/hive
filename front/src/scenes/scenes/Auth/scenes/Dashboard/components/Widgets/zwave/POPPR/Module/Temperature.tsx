import React from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from '../model/types';
import { ScreenSize } from '~/constants/enums';

type Props = {
    zwaveModel: IZwaveNode;
    size: ScreenSize;
};

function Temperature({ zwaveModel, size }: Props) {
    const currentParam = zwaveModel.values.find(
        x => x.value_id === `${x.node_id}-${Types.CurrentTemperature}`
    );

    const setParam = zwaveModel.values.find(
        x => x.value_id === `${x.node_id}-${Types.SetTemperature}`
    );

    const ctemp = currentParam ? currentParam.value : 0;
    const stemp = setParam ? setParam.value : 0;

    if (size === ScreenSize.small) {
        return <h4>{ctemp}&#176; C</h4>;
    }

    return (
        <h3>
            {ctemp}&#176; C / {stemp}&#176; C
        </h3>
    );
}

export default observer(Temperature);
