import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Intent } from '@blueprintjs/core';
import Service from '../model/Service';

type Props = {
    id: number;
    service: Service;
    edit?: boolean;
};

class Power extends Component<Props> {
    click = () => {
        const { service, id } = this.props;

        const globalService = service.getService();
        const view = service.getStatuses;
        const status = view.getData(id);

        if (status) globalService.setPower(id, !status.enabled);
    };

    render() {
        const { service, edit, id } = this.props;

        const view = service.getStatuses;
        const status = view.getData(id);

        if (!status) return null;

        const text = !status.enabled ? 'Off' : 'On';
        const intent = !status.enabled ? Intent.NONE : Intent.PRIMARY;

        return (
            <Button disabled={edit || status.loading} intent={intent} onClick={this.click}>
                {text}
            </Button>
        );
    }
}

export default observer(Power);
