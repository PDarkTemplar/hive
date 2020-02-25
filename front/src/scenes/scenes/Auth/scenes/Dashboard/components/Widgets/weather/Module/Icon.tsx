import React, { Component } from 'react';
import cn from 'classnames';

import { observer } from 'mobx-react';

import { ScreenSize } from '~/constants/enums';

import Icons from './Icons';

import styles from './index.scss';

type Props = {
    icon: string;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    render() {
        const { size, icon } = this.props;

        const smallClass = cn({ [styles.iconSmall]: size === ScreenSize.small });

        const SvgIcon = Icons[icon];

        return <SvgIcon className={smallClass} />;
    }
}

export default observer(Icon);
