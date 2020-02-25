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

        this.value = status.settedSpeed;
    };

    @action
    change = (value: number) => {
        if (value % 10 !== 0 && value !== 15) {
            this.value = value + 5;
        } else {
            this.value = value;
        }

        this.changing = true;
    };

    @action
    changeSpeed = (value: number) => {
        const { service } = this.props;
        const globalService = service.getService();

        this.changing = false;
        globalService.setSpeed(value);
    };

    render() {
        const { edit, service } = this.props;

        // eslint-disable-next-line no-unused-expressions
        service.getStatuses.status.settedSpeed;

        return (
            <Label>
                Speed
                <Slider
                    className={styles.slider}
                    min={15}
                    max={100}
                    stepSize={5}
                    value={this.value}
                    labelStepSize={20}
                    onChange={this.change}
                    onRelease={this.changeSpeed}
                    disabled={edit}
                />
            </Label>
        );
    }
}

export default observer(SliderWrap);
