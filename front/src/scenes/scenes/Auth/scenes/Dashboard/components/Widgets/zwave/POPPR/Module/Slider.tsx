import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Slider } from '@blueprintjs/core';
import { Types } from '../model/types';
import Service from '../model/Service';

import styles from './index.scss';

const max = 28;
const min = 20;

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

        const stemp = setParam ? setParam.value : 0;

        this.value = Number(stemp);
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
        if (max === value) {
            return '';
        }

        return value.toFixed(1);
    };

    render() {
        const { edit } = this.props;

        return (
            <Slider
                className={styles.slider}
                min={min}
                max={max}
                stepSize={0.5}
                value={this.value}
                labelRenderer={this.labelRenderer}
                labelStepSize={2}
                onChange={this.change}
                onRelease={this.changeTemperature}
                disabled={edit}
            />
        );
    }
}

export default observer(SliderWrap);
