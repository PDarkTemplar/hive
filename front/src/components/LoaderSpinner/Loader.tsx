import React from 'react';
import { Spinner, Intent } from '@blueprintjs/core';

import styles from './index.scss';

type Props = {
    visible: boolean;
};

function LoaderComp({ visible }: Props) {
    if (!visible) return null;
    return (
        <div className={styles.loaderWrap}>
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        </div>
    );
}

export default LoaderComp;
