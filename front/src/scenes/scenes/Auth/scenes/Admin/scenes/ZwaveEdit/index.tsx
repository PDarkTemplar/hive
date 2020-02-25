import React, { Component, Fragment } from 'react';

import { match as Match, Redirect } from 'react-router';
import { Button, Intent } from '@blueprintjs/core';
import { inject } from 'components/Hoc';
import Dialog from 'components/DialogWithButtons';
import Toast from 'components/Toaster';

import ConfigService from '~/store/z-wave/services/ConfigService';
import ZwaveService from '~/store/z-wave/services';
import Config from '~/store/z-wave/viewModels/Config';
import CommonView from '~/store/common/viewModels/Common';

import ConfigContent from './components/ConfigContent';
import constants from '~/constants';

import styles from './index.scss';

type Props = {
    match: Match<{ id: string }>;
    configService: ConfigService;
    zwaveService: ZwaveService;
    config: Config;
    common: CommonView;
};

class EditNode extends Component<Props> {
    componentDidMount() {
        const { match, configService } = this.props;

        document.body.addEventListener('keydown', this.keyDown, true);

        configService.loadConfigData(match.params.id);
    }

    componentWillUnmount() {
        const { config } = this.props;

        document.body.removeEventListener('keydown', this.keyDown, true);

        config.close();
    }

    save = () => {
        const { configService } = this.props;
        configService.save();
        Toast.show({ message: 'Save successful', intent: Intent.SUCCESS, timeout: 3000 });
    };

    keyDown = (ev: KeyboardEvent) => {
        const { configService } = this.props;
        if (ev.key === constants.keys.esc) {
            configService.cancelEdit();
        }
    };

    forceRemove = () => {
        const { match, zwaveService } = this.props;

        zwaveService.forceRemove(Number(match.params.id));
    };

    render() {
        const { config, common, configService } = this.props;

        if (common.isMobile) {
            return <Redirect to={constants.paths.dashboard} />;
        }

        if (!config.data) return null;

        return (
            <Fragment>
                <div className={styles.editWrap}>
                    <div className={styles.content}>
                        <div className={styles.background} />
                        <div className={styles.internalContent}>
                            <ConfigContent />
                            <div className={styles.buttonWrap}>
                                <Button
                                    large
                                    intent={Intent.DANGER}
                                    className={styles.remove}
                                    onClick={config.openRemoveDialog}
                                >
                                    Remove
                                </Button>
                                <Button large onClick={configService.cancelEdit}>
                                    Cancel
                                </Button>
                                <Button onClick={this.save} large intent={Intent.SUCCESS}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    isOpen={config.removeOpened}
                    onClose={config.closeRemoveDialog}
                    title="Remove node"
                    confirmText="Remove"
                    cancelText="Cancel"
                    onConfirm={this.forceRemove}
                    onCancel={config.closeRemoveDialog}
                    intent={Intent.DANGER}
                >
                    Are you sure?
                </Dialog>
            </Fragment>
        );
    }
}

const injected = inject(EditNode, x => ({
    configService: x.services.zWaveService.configService,
    zwaveService: x.services.zWaveService,
    config: x.viewModels.zWaveView.nodeControl.config,
    common: x.viewModels.commonView,
}));
export default injected;
