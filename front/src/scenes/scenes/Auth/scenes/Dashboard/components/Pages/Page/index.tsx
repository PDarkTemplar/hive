import React from 'react';
import cn from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PageView from 'store/dashboard/viewModels/Page';
import CommonView from 'store/common/viewModels/Common';
import DashboardView from 'store/dashboard/viewModels/Dashboard';

import LoaderSpinner from 'components/LoaderSpinner';

import Header from './Header';
import Content from './Content';

import styles from './index.scss';
import { inject } from '~/components/Hoc';

type Props = {
    dashboard: DashboardView;
    page: PageView;
    common: CommonView;
    index: number;
};

function Page({ page, index, common, dashboard }: Props) {
    const currentKey = index;
    const timeout = { enter: 300, exit: 200 };

    const wrapClass = cn(styles.wrap, { [styles.mobile]: common.isMobile });

    return (
        <TransitionGroup component="div" className={styles.mainTransition}>
            <CSSTransition key={currentKey} timeout={timeout} classNames="animated-fade" appear>
                <div className={wrapClass}>
                    <LoaderSpinner loading={dashboard.loading} />
                    <Header page={page} />
                    <div className={styles.content}>
                        <div className={styles.background} />
                        <div className={styles.internalContent}>
                            <Content />
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default inject(Page, x => ({
    common: x.viewModels.commonView,
    dashboard: x.viewModels.dashboardView,
}));
