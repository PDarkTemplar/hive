import React from 'react';
import { inject } from 'components/Hoc';
import cn from 'classnames';
import Model from '../../model/Model';
import { ScreenSize } from '~/constants/enums';
import Service from '../../model/Service';
import { SensorIds } from '../../model/types';
import Temperature from '../Sensors/Temperature';
import Humidity from '../Sensors/Humidity';
import Luminance from '../Sensors/Luminance';
import Motion from '../Sensors/Motion';

import styles from './index.scss';
import ModuleWrap, { Size } from '~/components/ModuleWrap';

type Props = {
    model: Model;
    service: Service | null;
    size: ScreenSize;
};

function DialogView({ model, service, size }: Props) {
    if (!service) return null;

    const node = service.getDataByNodeId;

    if (!node) return null;

    const temperatureValue = node.values.find(
        x => x.value_id === `${model.id}-${SensorIds.Temperature}`
    );
    const humidityValue = node.values.find(x => x.value_id === `${model.id}-${SensorIds.Humidity}`);
    const luminanceValue = node.values.find(
        x => x.value_id === `${model.id}-${SensorIds.Luminance}`
    );
    const motionValue = node.values.find(x => x.value_id === `${model.id}-${SensorIds.Burglar}`);

    const moduleClass = cn(styles.module, { [styles.small]: size === ScreenSize.small });

    return (
        <div className={styles.wrap}>
            {temperatureValue && (
                <ModuleWrap size={Size.none} className={moduleClass}>
                    <Temperature size={size} model={model} value={temperatureValue} />
                </ModuleWrap>
            )}
            {humidityValue && (
                <ModuleWrap size={Size.none} className={moduleClass}>
                    <Humidity size={size} model={model} value={humidityValue} />
                </ModuleWrap>
            )}
            {luminanceValue && (
                <ModuleWrap size={Size.none} className={moduleClass}>
                    <Luminance model={model} size={size} value={luminanceValue} />
                </ModuleWrap>
            )}
            {motionValue && (
                <ModuleWrap size={Size.none} className={moduleClass}>
                    <Motion size={size} value={motionValue} />
                </ModuleWrap>
            )}
        </div>
    );
}

export default inject(DialogView, x => ({ size: x.viewModels.commonView.size }));
