import React from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';

import Sensor from './Sensor';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
};

function Big({ service }: Props) {
    if (!service) return null;

    const zwaveModel = service.getDataByNodeId;

    if (!zwaveModel) return null;

    return <Sensor size={ScreenSize.big} zwaveModel={zwaveModel} />;
}

export default observer(Big);
