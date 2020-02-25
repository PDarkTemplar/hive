import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Button, Intent } from '@blueprintjs/core';
import { Types } from '../model/types';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
};

class Switch extends Component<Props> {
    click = () => {
        const { service, zwaveModel } = this.props;

        service.toggle(zwaveModel);
    };

    render() {
        const { zwaveModel, edit } = this.props;

        const enabledParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Enable}`
        );

        const enabled = enabledParam && !!enabledParam.value;

        const text = !enabled ? 'Off' : 'On';
        const intent = !enabled ? Intent.NONE : Intent.PRIMARY;

        return (
            <Button className={styles.switch} disabled={edit} intent={intent} onClick={this.click}>
                {text}
            </Button>
        );
    }
}

export default observer(Switch);
