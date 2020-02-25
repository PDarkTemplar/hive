import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import Power from './Power';
import SpeedSlider from './SpeedSlider';
import TemperatureSlider from './TemperatureSlider';
import ModeSwitch from './ModeSwitch';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Big extends Component<Props> {
    render() {
        const { service, edit, model } = this.props;

        if (!service) return null;

        const idNumber = Number(model.id.replace('c', ''));

        return (
            <div className={styles.wrap}>
                <Icon size={ScreenSize.big} service={service} id={idNumber} />
                <div className={styles.innerWrap}>
                    <div className={styles.buttonWrap}>
                        <Power service={service} edit={edit} id={idNumber} />
                        <ModeSwitch service={service} edit={edit} id={idNumber} />
                    </div>
                    <SpeedSlider edit={edit} service={service} id={idNumber} />
                    <TemperatureSlider edit={edit} service={service} id={idNumber} />
                </div>
            </div>
        );
    }
}

export default observer(Big);
