import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Button, Intent } from '@blueprintjs/core';
import { Types } from '../model/types';
import Service from '../model/Service';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
};

class Power extends Component<Props> {
    click = () => {
        const { service, zwaveModel } = this.props;

        const levelParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Level}`
        );

        const on = !!levelParam && !!levelParam.value;

        service.toggle(zwaveModel, on);
    };

    render() {
        const { zwaveModel, edit } = this.props;

        const levelParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Level}`
        );

        const on = !!levelParam && !!levelParam.value;

        const text = !on ? 'Off' : 'On';
        const intent = !on ? Intent.NONE : Intent.PRIMARY;

        return (
            <Button disabled={edit} intent={intent} onClick={this.click}>
                {text}
            </Button>
        );
    }
}

export default observer(Power);
