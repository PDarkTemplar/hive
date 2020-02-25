import React, { Component, ChangeEvent } from 'react';
import { observable, action } from 'mobx';

import { InputGroup } from '@blueprintjs/core';

import { inject } from 'components/Hoc';

import PageView from 'store/dashboard/viewModels/Page';
import DashboardView from 'store/dashboard/viewModels/Dashboard';

import styles from './index.scss';

import HeaderControls from './HeaderControls';

type Props = {
    page: PageView;
    dashboard: DashboardView;
};

class Header extends Component<Props> {
    @observable
    private date: Date = new Date();

    private interval: number = -1;

    constructor(props: Props) {
        super(props);

        this.interval = window.setInterval(() => {
            this.setDate();
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval > -1) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    @action
    setDate = () => {
        this.date = new Date();
    };

    setName = (e: ChangeEvent<HTMLInputElement>) => {
        const { page } = this.props;
        page.setName(e.target.value);
    };

    renderInput = () => {
        const { page } = this.props;
        return (
            <InputGroup
                className={styles.edit}
                id="edit"
                placeholder="Set name"
                onChange={this.setName}
                value={page.name}
            />
        );
    };

    renderView = () => {
        const { page } = this.props;
        const name = page.name ? page.name : 'No name';
        return <div className={styles.name}>{name}</div>;
    };

    render() {
        const { dashboard } = this.props;

        const item = dashboard.edit ? this.renderInput() : this.renderView();

        return (
            <div className={styles.header}>
                <div className={styles.nameWrap}>{item}</div>
                <div className={styles.date}>{this.date.toLocaleString()}</div>
                <HeaderControls />
            </div>
        );
    }
}

export default inject(Header, x => ({
    dashboard: x.viewModels.dashboardView,
}));
