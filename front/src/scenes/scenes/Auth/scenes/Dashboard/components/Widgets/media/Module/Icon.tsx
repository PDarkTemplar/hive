import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import Service from '../model/Service';
import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import { Action } from '~/store/media/viewModels/types';

type Props = {
    service: Service;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    render() {
        const { size, service } = this.props;

        const { data } = service.getStatuses;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
            [styles.off]: data.action === Action.off,
            [styles.pc]: data.action === Action.pc,
            [styles.server]: data.action === Action.server,
        });

        return <div className={iconClass} />;
    }
}

export default observer(Icon);
