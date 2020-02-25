import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Slider, Label } from '@blueprintjs/core';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
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
        const { service } = this.props;

        const { status } = service.getStatuses;

        this.value = status.settedTemperature;
    };

    @action
    change = (value: number) => {
        this.value = value;
        this.changing = true;
    };

    @action
    changeSpeed = (value: number) => {
        const { service } = this.props;
        const globalService = service.getService();

        this.changing = false;
        globalService.setTemperature(value);
    };

    render() {
        const { edit, service } = this.props;

        // eslint-disable-next-line no-unused-expressions
        service.getStatuses.status.settedTemperature;

        return (
            <Label>
                Temperature
                <Slider
                    className={styles.slider}
                    min={5}
                    max={34}
                    stepSize={1}
                    value={this.value}
                    labelStepSize={5}
                    onChange={this.change}
                    onRelease={this.changeSpeed}
                    disabled={edit}
                />
            </Label>
        );
    }
}

export default observer(SliderWrap);
