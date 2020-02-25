import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FormGroup, NumericInput } from '@blueprintjs/core';
import Model from '../../model/Model';
import { SensorIds } from '../../model/types';

import styles from './index.scss';

type Props = {
    model: Model;
};

class Humidity extends Component<Props> {
    render() {
        const { model } = this.props;

        if (model.selectedSensorId !== SensorIds.Humidity) return null;

        return (
            <div className={styles.inline}>
                <FormGroup label="Humidity min %" labelFor="hmin">
                    <NumericInput
                        className={styles.shrink}
                        id="hmin"
                        value={model.humidityMin}
                        onValueChange={model.changeHumidityMin}
                        clampValueOnBlur
                        min={5}
                        max={100}
                    />
                </FormGroup>
                <FormGroup label="Humidity max %" labelFor="hmax">
                    <NumericInput
                        className={styles.shrink}
                        id="hmax"
                        value={model.humidityMax}
                        onValueChange={model.changeHumidityMax}
                        clampValueOnBlur
                        min={5}
                        max={100}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default observer(Humidity);
