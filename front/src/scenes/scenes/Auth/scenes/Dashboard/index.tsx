import React, { Component } from 'react';
import { inject } from 'components/Hoc';

import CommonService from 'store/common/services/Common';

import Pages from './components/Pages';
import Dots from './components/Dots';

import styles from './index.scss';

type Props = {
    service: CommonService;
};

class Dashboard extends Component<Props> {
    render() {
        return (
            <div className={styles.wrap}>
                <Dots />
                <div className={styles.pagesWrap}>
                    <Pages />
                </div>
            </div>
        );
    }
}

const injected = inject(Dashboard, x => ({
    service: x.services.commonService,
}));

export default injected;
