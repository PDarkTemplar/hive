import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Icon from './Icon';
import Switch from './Switch';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Big extends Component<Props> {
    render() {
        const { service, edit } = this.props;

        if (!service) return null;

        const zwaveModel = service.getDataByNodeId;

        if (!zwaveModel) return null;

        return (
            <div className={styles.wrap}>
                <Icon zwaveModel={zwaveModel} size={ScreenSize.big} />
                <Switch zwaveModel={zwaveModel} service={service} edit={edit} />
            </div>
        );
    }
}

export default observer(Big);
