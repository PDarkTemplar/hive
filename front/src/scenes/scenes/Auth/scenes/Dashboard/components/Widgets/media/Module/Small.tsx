import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Service from '../model/Service';
import Model from '../model/Model';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Small extends Component<Props> {
    render() {
        const { service } = this.props;

        if (!service) return null;

        return (
            <div className={styles.wrap}>
                <Icon size={ScreenSize.small} service={service} />
            </div>
        );
    }
}

export default observer(Small);
