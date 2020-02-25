import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Action } from '~/store/media/viewModels/types';
import { Intent, Button } from '@blueprintjs/core';

import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    edit?: boolean;
};

class RightCoumn extends Component<Props> {
    pc = () => {
        const { service } = this.props;

        service.getService().setAction(Action.pc);
    };

    server = () => {
        const { service } = this.props;

        service.getService().setAction(Action.server);
    };

    render() {
        const { edit } = this.props;

        return (
            <div className={styles.right}>
                <Button disabled={edit} intent={Intent.PRIMARY} onClick={this.pc}>
                    Pc
                </Button>
                <Button disabled={edit} intent={Intent.PRIMARY} onClick={this.server}>
                    Server
                </Button>
            </div>
        );
    }
}

export default observer(RightCoumn);
