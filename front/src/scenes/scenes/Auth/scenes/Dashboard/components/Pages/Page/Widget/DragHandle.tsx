import React from 'react';
import { observer } from 'mobx-react';

import { IconNames } from '@blueprintjs/icons';
import { Icon } from '@blueprintjs/core';
import styles from './index.scss';

function DragHandle() {
    return (
        <div className={styles.dragHandle}>
            <Icon icon={IconNames.LAYOUT_GRID} iconSize={16} />
        </div>
    );
}

export default observer(DragHandle);
