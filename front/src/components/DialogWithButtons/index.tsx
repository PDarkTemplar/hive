import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Intent, Button } from '@blueprintjs/core';

import Dialog from '../Dialog';

import styles from './index.scss';

type Props = {
    isOpen: boolean;
    title: string;
    iconClass?: string;
    onClose: () => void;
    children: ReactNode;
    cancelText?: string;
    discardText?: string;
    confirmText: string;
    onCancel?: () => void;
    onDiscard?: () => void;
    onConfirm: () => void;
    intent: Intent;
    discardIntent?: Intent;
};

function DialogWithButtons({
    isOpen,
    title,
    iconClass,
    onClose,
    children,
    cancelText,
    confirmText,
    discardText,
    onDiscard,
    onCancel,
    onConfirm,
    intent,
    discardIntent,
}: Props) {
    const iconInternalClass = cn(styles.icon, iconClass);
    const cancelClass = cn({ [styles.cancelTwo]: !discardText });

    const icon = iconClass ? <div className={iconInternalClass} /> : false;

    return (
        <Dialog isOpen={isOpen} title={title} icon={icon} onClose={onClose}>
            <div className={styles.content}>{children}</div>
            <div className={styles.buttons}>
                {discardText && (
                    <Button intent={discardIntent} className={styles.discard} onClick={onDiscard}>
                        {discardText}
                    </Button>
                )}
                {cancelText && (
                    <Button className={cancelClass} onClick={onCancel}>
                        {cancelText}
                    </Button>
                )}
                <Button onClick={onConfirm} intent={intent}>
                    {confirmText}
                </Button>
            </div>
        </Dialog>
    );
}

DialogWithButtons.defaultProps = {
    intent: Intent.NONE,
};

export default DialogWithButtons;
