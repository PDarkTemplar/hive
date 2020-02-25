import React, { Component } from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { Action } from '~/store/media/viewModels/types';
import { Intent, Icon, Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import Service from '../model/Service';

import styles from './index.scss';

type Props = {
    service: Service;
    edit?: boolean;
};

class LeftCoumn extends Component<Props> {
    off = () => {
        const { service } = this.props;

        service.getService().setAction(Action.off);
    };

    volUp = () => {
        const { service } = this.props;

        service.getService().setAction(Action.volPlus);
    };

    volDown = () => {
        const { service } = this.props;

        service.getService().setAction(Action.volMinus);
    };

    mute = () => {
        const { service } = this.props;

        service.getService().setAction(Action.mute);
    };

    tvOn = () => {
        const { service } = this.props;

        service.getService().setAction(Action.tvon);
    };

    tvOff = () => {
        const { service } = this.props;

        service.getService().setAction(Action.tvoff);
    };

    render() {
        const { service, edit } = this.props;

        const { action } = service.getStatuses.data;
        const off = action === Action.off;
        const disabled = off || edit;

        return (
            <div className={styles.buttons}>
                <Button
                    disabled={disabled}
                    className={styles.button}
                    intent={Intent.PRIMARY}
                    onClick={this.off}
                >
                    <Icon icon={IconNames.POWER} iconSize={16} />
                </Button>
                <div className={styles.volumeButtons}>
                    <Button
                        disabled={disabled}
                        className={styles.button}
                        intent={Intent.PRIMARY}
                        onClick={this.volUp}
                    >
                        <Icon icon={IconNames.VOLUME_UP} iconSize={16} />
                    </Button>
                    <Button
                        disabled={disabled}
                        className={styles.button}
                        intent={Intent.PRIMARY}
                        onClick={this.mute}
                    >
                        <Icon icon={IconNames.VOLUME_OFF} iconSize={16} />
                    </Button>
                    <Button
                        disabled={disabled}
                        className={styles.button}
                        intent={Intent.PRIMARY}
                        onClick={this.volDown}
                    >
                        <Icon icon={IconNames.VOLUME_DOWN} iconSize={16} />
                    </Button>
                </div>
                <div className={styles.tvButtons}>
                    <Button className={styles.button} intent={Intent.PRIMARY} onClick={this.tvOn}>
                        <div className={styles.tvOn} />
                    </Button>
                    <Button className={styles.button} intent={Intent.PRIMARY} onClick={this.tvOff}>
                        <div className={styles.tvOff} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default observer(LeftCoumn);
