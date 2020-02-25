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

        if (status) this.value = status.fan;
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
        globalService.setSpeed(id, value);
    };

    labelRenderer = (value: number) => {
        if (value === 0) {
            return 'auto';
        }

        return value.toString();
    };

    render() {
        const { edit, service, id } = this.props;

        const view = service.getStatuses;
        const statuses = view.getData(id);

        if (!statuses) return null;

        // eslint-disable-next-line no-unused-expressions
        statuses.fan;

        return (
            <Label>
                Speed
                <Slider
                    className={styles.slider}
                    min={0}
                    max={3}
                    stepSize={1}
                    value={this.value}
                    labelStepSize={1}
                    onChange={this.change}
                    onRelease={this.changeSpeed}
                    labelRenderer={this.labelRenderer}
                    disabled={edit || statuses.loading}
                />
            </Label>
        );
    }
}

export default observer(SliderWrap);
