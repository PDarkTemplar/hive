import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Dialog as DialogComp, IDialogProps } from '@blueprintjs/core';

import styles from './index.scss';

type Props = {
    children: ReactNode;
} & IDialogProps;

function Alert({ children, className, ...otherProps }: Props) {
    const alertClass = cn(className, styles.alert);
    return (
        <DialogComp {...otherProps} className={alertClass}>
            {children}
        </DialogComp>
    );
}

export default Alert;
