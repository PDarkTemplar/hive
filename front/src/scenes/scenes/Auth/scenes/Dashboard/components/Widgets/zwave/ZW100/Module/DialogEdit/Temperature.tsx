import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FormGroup, NumericInput } from '@blueprintjs/core';
import Model from '../../model/Model';
import { SensorIds } from '../../model/types';

import styles from './index.scss';

type Props = {
    model: Model;
};

class Temperature extends Component<Props> {
    render() {
        const { model } = this.props;

        if (model.selectedSensorId !== SensorIds.Temperature) return null;

        return (
            <div className={styles.inline}>
                <FormGroup label="Temperature min&#176; C" labelFor="tmin">
                    <NumericInput
                        className={styles.shrink}
                        id="tmin"
                        value={model.temperatureMin}
                        onValueChange={model.changeTemperatureMin}
                        clampValueOnBlur
                        min={10}
                        max={40}
                    />
                </FormGroup>
                <FormGroup label="Temperature max&#176; C" labelFor="tmax">
                    <NumericInput
                        className={styles.shrink}
                        id="tmax"
                        value={model.temperatureMax}
                        onValueChange={model.changeTemperatureMax}
                        clampValueOnBlur
                        min={10}
                        max={40}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default observer(Temperature);
