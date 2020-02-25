import React from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';

import Sensors from './Sensors';

type Props = {
    model: Model;
    service: Service | null;
};

const Big = ({ model, service }: Props) => <Sensors model={model} service={service} />;

export default observer(Big);
