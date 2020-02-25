import React, { Component, MouseEvent } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Temperature from './Temperature';
import Icon from './Icon';
import Slider from './Slider';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Big extends Component<Props> {
    preventDefault = (e: MouseEvent) => {
        const { edit } = this.props;
        if (!edit) e.stopPropagation();
    };

    render() {
        const { service, edit } = this.props;

        if (!service) return null;

        const zwaveModel = service.getDataByNodeId;

        if (!zwaveModel) return null;

        return (
            <div className={styles.wrap} onClick={this.preventDefault}>
                <Icon zwaveModel={zwaveModel} service={service} edit={edit} size={ScreenSize.big} />
                <div className={styles.sliderWrap}>
                    <Temperature zwaveModel={zwaveModel} size={ScreenSize.big} />
                    <Slider zwaveModel={zwaveModel} service={service} edit={edit} />
                </div>
            </div>
        );
    }
}

export default observer(Big);
