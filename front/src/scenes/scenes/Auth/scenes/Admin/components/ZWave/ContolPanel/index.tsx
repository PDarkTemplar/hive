import React from 'react';

import HardReset from './HardReset';
import AddNode from './AddNode';
import RemoveNode from './RemoveNode';
import Heal from './Heal';

import styles from './index.scss';

function ControlPanel() {
    return (
        <div className={styles.wrap}>
            <AddNode />
            <RemoveNode />
            <Heal />
            <HardReset />
        </div>
    );
}

export default ControlPanel;
