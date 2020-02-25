import React from 'react';
import { observer } from 'mobx-react';

import Service from '../model/Service';

import { ScreenSize } from '~/constants/enums';

type Props = {
    index: number;
    service: Service;
    size: ScreenSize;
};

function Value({ service, index, size }: Props) {
    const data = service.getView.getData(index);

    if (data == null) return null;

    const { co2 } = data;

    if (size === ScreenSize.small) {
        return <h3>{co2} PPM</h3>;
    }

    return <h1>{co2} PPM</h1>;
}

export default observer(Value);
