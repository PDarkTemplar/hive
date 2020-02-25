import React, { Component } from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { Text } from '@blueprintjs/core';

import ModuleWrap from 'components/ModuleWrap';

import ZwaveService from 'store/z-wave/services';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';

import DeadNode from './DeadNode';

import styles from './index.scss';
import icons from './icons.scss';

type Props = {
    node: IZwaveNode;
    service: ZwaveService;
};

class Node extends Component<Props> {
    click = () => {
        const { node, service } = this.props;

        if (node.dead) {
            service.removeDead(node.nodeid);
            return;
        }

        service.openEdit(node.nodeid);
    };

    render() {
        const { node } = this.props;

        const nodeId = `${node.info.manufacturerid.replace(
            '0x',
            ''
        )}:${node.info.producttype.replace('0x', '')}:${node.info.productid.replace('0x', '')}`;

        const name = node.name ? node.name : nodeId;

        const iconClass = cn(icons.icon, icons[`i${nodeId.replace(/:/g, '')}`]);

        return (
            <ModuleWrap onClick={this.click} className={styles.card}>
                <DeadNode visible={!!node.dead} />
                <div className={iconClass} />
                <Text ellipsize className={styles.name}>
                    {name}
                </Text>
            </ModuleWrap>
        );
    }
}

export default observer(Node);
