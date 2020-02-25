import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FormGroup, NumericInput } from '@blueprintjs/core';
import Model from '../../model/Model';
import { SensorIds } from '../../model/types';

import styles from './index.scss';

type Props = {
    model: Model;
};

class Luminance extends Component<Props> {
    render() {
        const { model } = this.props;

        if (model.selectedSensorId !== SensorIds.Luminance) return null;

        return (
            <div className={styles.inline}>
                <FormGroup label="Luminance lx" labelFor="lmax">
                    <NumericInput
                        className={styles.shrink}
                        id="lmax"
                        value={model.luminanceMax}
                        onValueChange={model.changeLuminanceMax}
                        clampValueOnBlur
                        min={0}
                        max={5000}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default observer(Luminance);
