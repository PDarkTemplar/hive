import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

import styles from './index.scss';

type Props = {
    visible: boolean;
    callback: () => void;
};

function Retry({ visible, callback }: Props) {
    if (!visible) return null;
    return (
        <div className={styles.retryWrap}>
            <div className={styles.retryIcon} />
            <h3 className={styles.text}>Request failed</h3>
            <Button onClick={callback} intent={Intent.WARNING}>
                Retry
            </Button>
        </div>
    );
}

export default Retry;
