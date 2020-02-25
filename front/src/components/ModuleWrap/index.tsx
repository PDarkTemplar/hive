import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Card, Elevation } from '@blueprintjs/core';

import { Size } from './constants';

import styles from './index.scss';

type Props = {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
    size: Size;
    style?: Object;
};

function ModuleWrap({ children, onClick, className, size, style }: Props) {
    const cardClass = cn(styles.wrap, className, styles[size]);

    return (
        <Card
            interactive={!!onClick}
            elevation={Elevation.TWO}
            onClick={onClick}
            className={cardClass}
            style={style}
        >
            {children}
        </Card>
    );
}

ModuleWrap.defaultProps = {
    size: Size.m,
};

export default ModuleWrap;
export { Size } from './constants';
