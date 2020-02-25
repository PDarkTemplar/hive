import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Slider, Label } from '@blueprintjs/core';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    edit?: boolean;
    id: number;
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
        const { service, id } = this.props;

        const view = service.getStatuses;
        const status = view.getData(id);

        if (status) this.value = status.temperature;
    };

    @action
    change = (value: number) => {
        this.value = value;
        this.changing = true;
    };

    @action
    changeSpeed = (value: number) => {
        const { service, id } = this.props;
        const globalService = service.getService();

        this.changing = false;
        globalService.setTemperature(id, value);
    };

    render() {
        const { edit, service, id } = this.props;

        const view = service.getStatuses;
        const statuses = view.getData(id);

        if (!statuses) return null;

        // eslint-disable-next-line no-unused-expressions
        statuses.temperature;

        return (
            <Label>
                Temperature
                <Slider
                    className={styles.slider}
                    min={16}
                    max={30}
                    stepSize={1}
                    value={this.value}
                    labelStepSize={5}
                    onChange={this.change}
                    onRelease={this.changeSpeed}
                    disabled={edit || statuses.loading}
                />
            </Label>
        );
    }
}

export default observer(SliderWrap);
