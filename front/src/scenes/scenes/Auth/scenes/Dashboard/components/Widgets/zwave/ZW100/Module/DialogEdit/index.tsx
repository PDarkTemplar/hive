import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { RadioGroup, Radio, FormGroup, InputGroup } from '@blueprintjs/core';
import Model from '../../model/Model';
import { SensorIds } from '../../model/types';

import Service from '../../model/Service';
import styles from './index.scss';
import Temperature from './Temperature';
import Humidity from './Humidity';
import Luminance from './Luminance';

type Props = {
    model: Model;
    service: Service | null;
};

class DialogEdit extends Component<Props> {
    render() {
        const { model } = this.props;
        return (
            <div className={styles.wrap}>
                <FormGroup label="Name" labelFor="sname">
                    <InputGroup
                        id="sname"
                        placeholder="Name"
                        value={model.name}
                        onChange={model.changeName}
                    />
                </FormGroup>
                <div className={styles.settingsWrap}>
                    <RadioGroup
                        label="Select sensor"
                        onChange={model.selectSensor}
                        inline
                        selectedValue={model.selectedSensorId}
                    >
                        <Radio label="Temperature" value={SensorIds.Temperature} />
                        <Radio label="Humidity" value={SensorIds.Humidity} />
                        <Radio label="Luminance" value={SensorIds.Luminance} />
                        <Radio label="Motion" value={SensorIds.Burglar} />
                    </RadioGroup>
                    <Temperature model={model} />
                    <Humidity model={model} />
                    <Luminance model={model} />
                </div>
            </div>
        );
    }
}

export default observer(DialogEdit);
