import React, { Component, Fragment } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

type Props = {
    onTime: () => void;
};

class Content extends Component<Props> {
    @observable
    time: number = 120;

    componentDidMount() {
        this.timeout = setInterval(() => this.removeOneSecond(), 1000);
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    @action
    removeOneSecond = () => {
        const { onTime } = this.props;

        this.time -= 1;
        if (this.time <= 0) {
            this.time = 0;
            if (this.timeout) {
                clearInterval(this.timeout);
            }
            onTime();
        }
    };

    timeout?: NodeJS.Timeout;

    render() {
        return (
            <Fragment>
                <p>ZWave in the exclusion mode</p>
                <p>
                    You have <b>{this.time}s</b> before auto canceling
                </p>
            </Fragment>
        );
    }
}

export default observer(Content);
