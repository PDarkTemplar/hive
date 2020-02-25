import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Service from '../model/Service';
import Model from '../model/Model';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import OutSpeed from './OutSpeed';
import OutTemperature from './OutTemperature';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Small extends Component<Props> {
    render() {
        const { service, model } = this.props;

        if (!service) return null;

        const idNumber = Number(model.id.replace('c', ''));

        return (
            <div className={styles.wrap}>
                <Icon size={ScreenSize.small} service={service} id={idNumber} />
                <div className={styles.innerWrap}>
                    <OutSpeed service={service} id={idNumber} />
                    <OutTemperature service={service} id={idNumber} />
                </div>
            </div>
        );
    }
}

export default observer(Small);
