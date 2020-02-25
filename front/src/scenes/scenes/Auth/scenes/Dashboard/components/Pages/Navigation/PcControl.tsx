import React from 'react';
import cn from 'classnames';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import styles from './index.scss';

type Props = {
    isLeft: boolean;
    dashboard: DashboardView;
};

function PcControl({ isLeft, dashboard }: Props) {
    const icon = isLeft ? IconNames.CHEVRON_LEFT : IconNames.CHEVRON_RIGHT;

    const wrapClass = cn(styles.wrap, { [styles.hidden]: dashboard.totalPages === 1 });

    const click = isLeft ? dashboard.previousPage : dashboard.nextPage;

    return (
        <div className={wrapClass} onClick={click}>
            <Icon icon={icon} iconSize={32} />
        </div>
    );
}

export default inject(PcControl, x => ({ dashboard: x.viewModels.dashboardView }));
