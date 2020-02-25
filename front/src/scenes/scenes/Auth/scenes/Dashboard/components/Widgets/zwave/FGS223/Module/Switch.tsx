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
    type: Types;
};

class Switch extends Component<Props> {
    click = () => {
        const { service, zwaveModel, type } = this.props;

        service.toggle(zwaveModel, type);
    };

    render() {
        const { zwaveModel, edit, type } = this.props;

        const enabledParam = zwaveModel.values.find(x => x.value_id === `${x.node_id}-${type}`);

        const enabled = enabledParam && !!enabledParam.value;

        let text = !enabled ? 'Off' : 'On';
        text = (type === Types.Enable1 ? 'S1 ' : 'S2 ') + text;
        const intent = !enabled ? Intent.NONE : Intent.PRIMARY;

        return (
            <Button className={styles.switch} disabled={edit} intent={intent} onClick={this.click}>
                {text}
            </Button>
        );
    }
}

export default observer(Switch);
