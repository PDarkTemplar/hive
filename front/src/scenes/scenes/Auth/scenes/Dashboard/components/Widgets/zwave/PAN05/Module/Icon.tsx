import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from '../model/types';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    zwaveModel: IZwaveNode;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    render() {
        const { zwaveModel, size } = this.props;

        const enabledParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Enable}`
        );

        const enabled = enabledParam && !!enabledParam.value;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
        });

        const valveClass = cn(styles.valve, { [styles.valveOpen]: enabled });

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 512 512">
                <path d="M497 271h-91c-8.285 0-15 6.715-15 15v15h-30v-45c0-24.813-20.188-45-45-45h-15v-46h-90v46h-15c-24.813 0-45 20.188-45 45v45h-30v-15c0-8.285-6.715-15-15-15H15c-8.285 0-15 6.715-15 15v211c0 8.285 6.715 15 15 15h91c8.285 0 15-6.715 15-15v-15h270v15c0 8.285 6.715 15 15 15h91c8.285 0 15-6.715 15-15V286c0-8.285-6.715-15-15-15zm-76 90h61v61h-61zm0-60h61v30h-61zM241 165h30v46h-30zm-60 91c0-8.27 6.73-15 15-15h120c8.27 0 15 6.73 15 15v45H181zM30 361h61v61H30zm61-60v30H30v-30zm0 181H30v-30h61zm30-30V331h270v121zm300 30v-30h61v30z" />
                <path
                    className={valveClass}
                    d="M328.18 166.712c3.98 0 7.793-1.582 10.606-4.395l70.609-70.605h57.363c24.813 0 45-20.188 45-45 0-24.813-20.187-45-45-45h-88.422c-3.98 0-7.793 1.582-10.605 4.394l-66.973 66.97V61.711c0-24.813-20.187-45-45-45-24.812 0-45 20.187-45 45v15h-15c-8.285 0-15 6.715-15 15v60c0 8.285 6.715 15 15 15 50.955-.128 97.968.22 132.422 0zm-87.422-105c0-8.27 6.73-15 15-15s15 6.73 15 15v15h-30zm-30 45h92.578c3.977 0 7.793-1.582 10.606-4.395l70.61-70.605h82.206c8.27 0 15 6.73 15 15s-6.73 15-15 15H403.18a15.003 15.003 0 0 0-10.605 4.394l-70.61 70.606H210.758z"
                />
            </svg>
        );
    }
}

export default observer(Icon);
