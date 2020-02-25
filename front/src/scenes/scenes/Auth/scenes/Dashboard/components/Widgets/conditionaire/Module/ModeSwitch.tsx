import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Switch } from '@blueprintjs/core';
import Service from '../model/Service';

import { Mode } from '~/store/conditionaire/viewModels/types';

import styles from './index.scss';

type Props = {
    id: number;
    service: Service;
    edit?: boolean;
};

class ModeSwitch extends Component<Props> {
    change = () => {
        const { service, id } = this.props;

        const globalService = service.getService();
        const view = service.getStatuses;
        const status = view.getData(id);

        if (status) globalService.setMode(id, status.mode === Mode.cool ? Mode.warm : Mode.cool);
    };

    render() {
        const { service, edit, id } = this.props;

        const view = service.getStatuses;
        const status = view.getData(id);

        if (!status) return null;

        return (
            <Switch
                disabled={edit || status.loading}
                checked={status.mode === Mode.cool}
                label="Mode"
                className={styles.switch}
                innerLabelChecked="c"
                innerLabel="w"
                onChange={this.change}
            />
        );
    }
}

export default observer(ModeSwitch);
