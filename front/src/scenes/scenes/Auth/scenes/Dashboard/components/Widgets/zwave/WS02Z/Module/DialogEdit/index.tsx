import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import Model from '../../model/Model';

import Service from '../../model/Service';
import styles from './index.scss';

type Props = {
    model: Model;
    service: Service | null;
};

class DialogEdit extends Component<Props> {
    render() {
        const { model } = this.props;
        return (
            <div className={styles.wrap}>
                <FormGroup label="Name" labelFor="sname">
                    <InputGroup
                        id="sname"
                        placeholder="Name"
                        value={model.name}
                        onChange={model.changeName}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default observer(DialogEdit);
