import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from '../model/types';

import Service from '../model/Service';
import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    render() {
        const { zwaveModel, size } = this.props;

        const positionParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Position}`
        );

        const position = positionParam ? Number(positionParam.value) : 0;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
        });

        const style = {
            transform: `scaleY(${100 - position})`,
        };

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 200 200">
                <rect
                    ry="2.207"
                    y="171.799"
                    x="9.138"
                    height="17.743"
                    width="181.724"
                    fill="none"
                    strokeWidth="6.35"
                    strokeLinejoin="round"
                />
                <rect
                    ry="2.206"
                    y="27.878"
                    x="20.641"
                    height="143.483"
                    width="156.511"
                    fill="none"
                    strokeWidth="6.581"
                    strokeLinejoin="round"
                />
                <rect
                    ry="2.116"
                    y="36.674"
                    x="31.03"
                    height="123.444"
                    width="60.594"
                    fill="none"
                    strokeWidth="6.35"
                    strokeLinejoin="round"
                />
                <rect
                    ry="2.117"
                    y="36.675"
                    x="103.555"
                    height="123.483"
                    width="61.556"
                    fill="none"
                    strokeWidth="6.35"
                    strokeLinejoin="round"
                />
                <circle
                    cy="14.227"
                    cx="14.138"
                    r="4.944"
                    fill="none"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
                <path
                    d="M30.28 148.615l60.774-17.857.697 2.243-60.773 17.858zM31.38 139.097l59.597-17.857.684 2.243-59.598 17.858zM103.658 143.64l60.773-17.857.697 2.243-60.773 17.858z"
                    strokeWidth="1.323"
                    strokeLinejoin="round"
                />
                <circle
                    cy="14.227"
                    cx="184.388"
                    r="4.944"
                    fill="none"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
                <path
                    style={style}
                    className={styles.blind}
                    d="M11.073 19.846h176.249v6.135H11.073z"
                    strokeWidth=".943"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
}

export default observer(Icon);
