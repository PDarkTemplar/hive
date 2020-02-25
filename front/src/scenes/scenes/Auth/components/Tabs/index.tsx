import React from 'react';
import { Location } from 'history';

import { IconNames } from '@blueprintjs/icons';

import { inject } from 'components/Hoc';
import constants from '~/constants';

import CommonView from 'store/common/viewModels/Common';

import Tab, { Position } from './Tab';

import styles from './index.scss';

type Props = {
    model: CommonView;
    location: Location;
};

function Tabs({ model, location }: Props) {
    if (model.isMobile) {
        return null;
    }

    return (
        <div className={styles.wrap}>
            <Tab
                position={Position.left}
                icon={IconNames.DASHBOARD}
                name="Dashboard"
                path={constants.paths.dashboard}
                active={location.pathname.indexOf('dashboard') > -1}
            />
            <Tab
                position={Position.right}
                icon={IconNames.COG}
                name="Admin panel"
                path={constants.paths.admin}
                active={location.pathname.indexOf('admin') > -1}
            />
        </div>
    );
}

const injected = inject(Tabs, x => ({
    model: x.viewModels.commonView,
}));

export default injected;
