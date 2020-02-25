import React, { Component, MouseEvent } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Icon from './Icon';
import Up from './Buttons/Up';
import Down from './Buttons/Down';
import Stop from './Buttons/Stop';
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
        const { service, model, edit } = this.props;

        if (!service) return null;

        const zwaveModel = service.getDataByNodeId;

        if (!zwaveModel) return null;

        return (
            <div className={styles.wrap} onClick={this.preventDefault}>
                <Icon zwaveModel={zwaveModel} service={service} edit={edit} size={ScreenSize.big} />
                <div className={styles.buttonWrap}>
                    <div className={styles.upDownWrap}>
                        <Up zwaveModel={zwaveModel} service={service} model={model} edit={edit} />
                        <Down zwaveModel={zwaveModel} service={service} model={model} edit={edit} />
                    </div>
                    <Stop zwaveModel={zwaveModel} service={service} model={model} edit={edit} />
                </div>
                <Slider zwaveModel={zwaveModel} service={service} model={model} edit={edit} />
            </div>
        );
    }
}

export default observer(Big);
