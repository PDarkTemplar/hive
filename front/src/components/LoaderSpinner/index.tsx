import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import Loader from './Loader';
import Retry from './Retry';

import styles from './index.scss';

type Props = {
    loading: boolean;
    timeout?: number;
    retryCallback?: () => void;
};

class LoaderSpinner extends Component<Props> {
    @observable
    failed: boolean = false;

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.init();
    }

    init = () => {
        const { timeout, loading } = this.props;

        if (timeout) {
            if (!loading) {
                if (this.timeoutId) clearTimeout(this.timeoutId);
            } else {
                this.timeoutId = setTimeout(() => {
                    this.setFailed(true);
                }, timeout);
            }
        }
    };

    @action
    setFailed = (val: boolean) => {
        this.failed = val;
    };

    retry = () => {
        const { retryCallback } = this.props;
        this.setFailed(false);
        if (retryCallback) retryCallback();
    };

    timeoutId?: NodeJS.Timeout;

    render() {
        const { loading } = this.props;

        if (!loading) return null;

        return (
            <div className={styles.wrap}>
                <div className={styles.overlay} />
                <Loader visible={loading && !this.failed} />
                <Retry visible={loading && this.failed} callback={this.retry} />
            </div>
        );
    }
}

const obs = observer(LoaderSpinner);

export default obs;
