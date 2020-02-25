import React, { Component } from 'react';

import { inject } from 'components/Hoc';
import Model from '../../model/Model';
import Service from '../../model/Service';
import { SensorIds } from '../../model/types';
import Temperature from './Temperature';
import Humidity from './Humidity';
import Luminance from './Luminance';
import Motion from './Motion';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
    size: ScreenSize;
};

class Selector extends Component<Props> {
    render() {
        const { model, size, service } = this.props;

        if (!service) return null;

        const node = service.getDataByNodeId;

        if (!node) return null;

        const value = node.values.find(x => x.value_id === `${model.id}-${model.selectedSensorId}`);

        if (!value) return null;

        switch (model.selectedSensorId) {
            case SensorIds.Temperature: {
                return <Temperature size={size} model={model} value={value} />;
            }
            case SensorIds.Humidity: {
                return <Humidity size={size} model={model} value={value} />;
            }
            case SensorIds.Luminance: {
                return <Luminance model={model} size={size} value={value} />;
            }
            case SensorIds.Burglar: {
                return <Motion size={size} value={value} />;
            }
            default:
                return null;
        }
    }
}

export default inject(Selector, x => ({ size: x.viewModels.commonView.size }));
