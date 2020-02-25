import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Button, Intent } from '@blueprintjs/core';
import { Types, Mode } from '../model/types';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
};

class Power extends Component<Props> {
    click = () => {
        const { service, zwaveModel } = this.props;

        service.changePower(zwaveModel);
    };

    render() {
        const { zwaveModel, edit } = this.props;

        const heatingParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Mode}`
        );

        const heating = !!(
            heatingParam &&
            (heatingParam.value === Mode.EnergyHeat || heatingParam.value === Mode.Heat)
        );

        const text = !heating ? 'Off' : 'On';
        const intent = !heating ? Intent.NONE : Intent.PRIMARY;

        return (
            <Button disabled={edit} className={styles.power} intent={intent} onClick={this.click}>
                {text}
            </Button>
        );
    }
}

export default observer(Power);
