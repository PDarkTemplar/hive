import React, { Component, ReactNode } from 'react';
import cn from 'classnames';

import { inject } from 'components/Hoc';
import LoaderSpinner from 'components/LoaderSpinner';
import AdminView from 'store/common/viewModels/Admin';

import styles from './index.scss';

type Props = {
    model: AdminView;
    index?: number;
    visible: boolean;
    iconClass: string;
    name: string;
    children: ReactNode;
    isDefault?: boolean;
    loading: boolean;
    loadingWithRetry?: boolean;
    retryTimeout?: number;
    retryCallback?: () => void;
};

class Tab extends Component<Props> {
    componentDidMount() {
        const { model, index, isDefault } = this.props;
        if (isDefault && model.openTabIndex === -1) {
            model.setTab(index as number);
        }
    }

    click = () => {
        const { model, index } = this.props;

        model.setTab(index as number);
    };

    renderLoadingAndRetrySpinner = () => {
        const { loadingWithRetry, retryTimeout, retryCallback } = this.props;

        if (loadingWithRetry == null || !retryTimeout || !retryCallback) return null;

        return (
            <LoaderSpinner
                loading={loadingWithRetry}
                timeout={retryTimeout}
                retryCallback={retryCallback}
            />
        );
    };

    render() {
        const { children, name, iconClass, visible, model, index, loading } = this.props;

        if (!visible) return null;

        const open = model.openTabIndex === index;

        const headerClass = cn(styles.header, { [styles.headerOpen]: open });
        const contentClass = cn(styles.content, { [styles.contentOpen]: open });
        const iconInternalClass = cn(styles.icon, iconClass);

        return (
            <div className={styles.tab}>
                <div onClick={this.click} className={headerClass}>
                    <div className={iconInternalClass} />
                    <div>{name}</div>
                </div>
                <div className={contentClass}>
                    <div className={styles.background} />
                    {this.renderLoadingAndRetrySpinner()}
                    <LoaderSpinner loading={loading} />
                    <div className={styles.internalContent}>{children}</div>
                </div>
            </div>
        );
    }
}

const injected = inject(Tab, x => ({
    model: x.viewModels.adminView,
}));
export default injected;
