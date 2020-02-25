import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Intent } from '@blueprintjs/core';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    edit?: boolean;
};

class Power extends Component<Props> {
    click = () => {
        const { service } = this.props;

        const globalService = service.getService();
        const { enabled } = service.getStatuses.status;

        globalService.setPower(!enabled);
    };

    render() {
        const { service, edit } = this.props;

        const { enabled } = service.getStatuses.status;

        const text = !enabled ? 'Off' : 'On';
        const intent = !enabled ? Intent.NONE : Intent.PRIMARY;

        return (
            <Button disabled={edit} className={styles.power} intent={intent} onClick={this.click}>
                {text}
            </Button>
        );
    }
}

export default observer(Power);
