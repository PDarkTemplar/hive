import React, { Component } from 'react';
import cn from 'classnames';

import { Icon } from '@blueprintjs/core';

import history from '~/history';

import styles from './index.scss';

export enum Position {
    left = 'left',
    right = 'right',
}

type Props = {
    icon: 'dashboard' | 'cog';
    position: Position;
    active: boolean;
    path: string;
    name: string;
};

class Tab extends Component<Props> {
    click = () => {
        const { path } = this.props;

        if (history.location.pathname !== path) history.push(path);
    };

    render() {
        const { icon, name, position, active } = this.props;

        const tabClass = cn(styles.tab, {
            [styles[`active-${position}`]]: active,
            [styles.active]: active,
        });

        return (
            <div onClick={this.click} className={tabClass}>
                <Icon icon={icon} iconSize={24} />
                <div className={styles.name}>{name}</div>
            </div>
        );
    }
}

export default Tab;
