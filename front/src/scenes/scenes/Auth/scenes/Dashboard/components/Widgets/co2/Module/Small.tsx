import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Service from '../model/Service';
import Model from '../model/Model';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import Value from './Value';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Small extends Component<Props> {
    render() {
        const { service, model } = this.props;

        if (!service) return null;

        const indexNumber = Number(model.id.replace('co2', ''));

        return (
            <div className={styles.wrap}>
                <Icon size={ScreenSize.small} service={service} index={indexNumber} />
                <div className={styles.innerWrap}>
                    <Value index={indexNumber} size={ScreenSize.small} service={service} />
                </div>
            </div>
        );
    }
}

export default observer(Small);
