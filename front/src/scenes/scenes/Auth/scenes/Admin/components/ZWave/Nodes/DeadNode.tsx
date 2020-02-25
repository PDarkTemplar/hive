import React from 'react';

import styles from './index.scss';

type Props = {
    visible: boolean;
};

function DeadNode({ visible }: Props) {
    if (!visible) return null;

    return (
        <div className={styles.deadWrap}>
            <div className={styles.deadOverlay} />
            <div className={styles.deadIcon} />
        </div>
    );
}

export default DeadNode;
