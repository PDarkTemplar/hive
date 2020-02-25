import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';

import Service from '../model/Service';
import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    render() {
        const { size } = this.props;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
        });

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 60 60">
                <path d="M57.5 17c1.379 0 2.5-1.121 2.5-2.5v-3c0-1.379-1.121-2.5-2.5-2.5S55 10.121 55 11.5v.5h-1V9h-3V8c0-2.206-1.794-4-4-4s-4 1.794-4 4v1a1 1 0 0 1-2 0V8c0-2.206-1.794-4-4-4s-4 1.794-4 4v1a1 1 0 0 1-2 0V8c0-2.206-1.794-4-4-4s-4 1.794-4 4v1a1 1 0 0 1-2 0V8c0-2.206-1.794-4-4-4s-4 1.794-4 4v1a1 1 0 0 1-2 0V8c0-2.206-1.794-4-4-4S3 5.794 3 8v2H0v7h3v26H0v7h3v2c0 2.206 1.794 4 4 4s4-1.794 4-4v-1a1 1 0 0 1 2 0v1c0 2.206 1.794 4 4 4s4-1.794 4-4v-1a1 1 0 0 1 2 0v1c0 2.206 1.794 4 4 4s4-1.794 4-4v-1a1 1 0 0 1 2 0v1c0 2.206 1.794 4 4 4s4-1.794 4-4v-1a1 1 0 0 1 2 0v1c0 2.206 1.794 4 4 4s4-1.794 4-4v-2h3v-1h6v-5h-6v-1h-3V17h3v-3h1v.5c0 1.379 1.121 2.5 2.5 2.5zM15 43c0 1.654-1.346 3-3 3s-3-1.346-3-3V17c0-1.654 1.346-3 3-3s3 1.346 3 3v26zm10 0c0 1.654-1.346 3-3 3s-3-1.346-3-3V17c0-1.654 1.346-3 3-3s3 1.346 3 3v26zm10 0c0 1.654-1.346 3-3 3s-3-1.346-3-3V17c0-1.654 1.346-3 3-3s3 1.346 3 3v26zm10 0c0 1.654-1.346 3-3 3s-3-1.346-3-3V17c0-1.654 1.346-3 3-3s3 1.346 3 3v26z" />
            </svg>
        );
    }
}

export default observer(Icon);
