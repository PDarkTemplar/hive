import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

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
                    <LeftColumn service={service} edit={edit} />
                    <RightColumn service={service} edit={edit} />
                </div>
            </div>
        );
    }
}

export default observer(Big);
