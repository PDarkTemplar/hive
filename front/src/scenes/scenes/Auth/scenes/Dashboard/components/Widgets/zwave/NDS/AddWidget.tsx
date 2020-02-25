import React, { Fragment } from 'react';

import styles from './index.scss';

type Props = {
    name: string;
};

const AddWidget = ({ name }: Props) => (
    <Fragment>
        <div className={styles.addIcon} />
        {name}
    </Fragment>
);

export default AddWidget;
