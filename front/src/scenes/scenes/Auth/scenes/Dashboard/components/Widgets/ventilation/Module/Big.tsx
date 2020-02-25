import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import Power from './Power';
import OutSpeed from './OutSpeed';
import SpeedSlider from './SpeedSlider';
import TemperatureSlider from './TemperatureSlider';
import OutTemperature from './OutTemperature';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Big extends Component<Props> {
    render() {
        const { service, edit } = this.props;

        if (!service) return null;

        return (
            <div className={styles.wrap}>
                <Icon size={ScreenSize.big} service={service} />
                <div className={styles.innerWrap}>
                    <div className={styles.buttonWrap}>
                        <Power service={service} edit={edit} />
                        <OutSpeed service={service} size={ScreenSize.big} />
                        /
                        <OutTemperature service={service} size={ScreenSize.big} />
                    </div>
                    <SpeedSlider edit={edit} service={service} />
                    <TemperatureSlider edit={edit} service={service} />
                </div>
            </div>
        );
    }
}

export default observer(Big);
