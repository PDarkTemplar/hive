import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Button, Intent, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import Service from '../../model/Service';

import Model from '../../model/Model';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    model: Model;
    edit?: boolean;
};

class Down extends Component<Props> {
    click = () => {
        const { service, zwaveModel } = this.props;

        service.toggle(zwaveModel, false);
    };

    render() {
        const { edit } = this.props;

        return (
            <Button disabled={edit} intent={Intent.PRIMARY} onClick={this.click}>
                <Icon icon={IconNames.CARET_DOWN} iconSize={16} />
            </Button>
        );
    }
}

export default observer(Down);
