import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Slider } from '@blueprintjs/core';
import { Types, Mode } from '../model/types';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
};

class SliderWrap extends Component<Props> {
    @observable
    private value: number = 0;

    @observable
    private changing: boolean = false;

    componentDidMount() {
        this.setNodeValue();
    }

    componentDidUpdate() {
        if (!this.changing) {
            this.setNodeValue();
        }
    }

    @action
    setNodeValue = () => {
        const { zwaveModel } = this.props;

        const setParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.SetTemperature}`
        );

        const energyParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.EnergyTemperature}`
        );

        const heatingParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Mode}`
        );

        const stemp = setParam ? setParam.value : 0;
        const etemp = energyParam ? energyParam.value : 0;
        const cmode = heatingParam ? heatingParam.value : Mode.Off;

        const setShowTemp = cmode === Mode.Heat ? stemp : etemp;

        this.value = Number(setShowTemp);
    };

    @action
    change = (value: number) => {
        this.value = value;
        this.changing = true;
    };

    @action
    changeTemperature = (value: number) => {
        const { service, zwaveModel } = this.props;

        this.changing = false;
        service.changeTemperature(zwaveModel, value);
    };

    labelRenderer = (value: number) => {
        const { zwaveModel } = this.props;
        const maxParam = zwaveModel.values.find(x => x.value_id === `${x.node_id}-${Types.Max}`);

        const max = maxParam ? (maxParam.value as number) / 10 : undefined;

        if (max === value) {
            return '';
        }

        return value.toFixed(1);
    };

    render() {
        const { zwaveModel, edit } = this.props;

        const minParam = zwaveModel.values.find(x => x.value_id === `${x.node_id}-${Types.Min}`);

        const maxParam = zwaveModel.values.find(x => x.value_id === `${x.node_id}-${Types.Max}`);

        const min = minParam ? (minParam.value as number) / 10 : undefined;
        const max = maxParam ? (maxParam.value as number) / 10 : undefined;

        return (
            <Slider
                className={styles.slider}
                min={min}
                max={max}
                stepSize={0.5}
                value={this.value}
                labelRenderer={this.labelRenderer}
                labelStepSize={5}
                onChange={this.change}
                onRelease={this.changeTemperature}
                disabled={edit}
            />
        );
    }
}

export default observer(SliderWrap);
