import React from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types, Mode } from '../model/types';
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

    const energyParam = zwaveModel.values.find(
        x => x.value_id === `${x.node_id}-${Types.EnergyTemperature}`
    );

    const heatingParam = zwaveModel.values.find(x => x.value_id === `${x.node_id}-${Types.Mode}`);

    const ctemp = currentParam ? currentParam.value : 0;
    const stemp = setParam ? setParam.value : 0;
    const etemp = energyParam ? energyParam.value : 0;
    const cmode = heatingParam ? heatingParam.value : Mode.Off;

    const setShowTemp = cmode === Mode.Heat ? stemp : etemp;
    const energyOn = cmode === Mode.Heat ? '' : ' (E)';

    if (size === ScreenSize.small) {
        return <h4>{ctemp}&#176; C</h4>;
    }

    return (
        <h3>
            {ctemp}&#176; C / {setShowTemp}&#176; C {energyOn}
        </h3>
    );
}

export default observer(Temperature);
