import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types } from '../model/types';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    zwaveModel: IZwaveNode;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    render() {
        const { zwaveModel, size } = this.props;

        const enabledParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Enable}`
        );

        const enabled = enabledParam && !!enabledParam.value;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
        });

        const lightClass = cn(styles.light, { [styles.enabledLight]: enabled });

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 512 512">
                <defs>
                    <filter
                        id="a"
                        x="-0.22903116"
                        width="1.4580623"
                        y="-0.26014821"
                        height="1.5202964"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="48" />
                    </filter>
                </defs>
                <ellipse
                    className={lightClass}
                    cx="257.48346"
                    cy="226.75499"
                    rx="253.35623"
                    ry="223.05159"
                    transform="matrix(.61063 0 0 .72978 98.349 77.592)"
                    fill="#fc0"
                    filter="url(#a)"
                />
                <path d="M210.286 466.286a9.155 9.155 0 0 0 9.143 9.143h73.143a9.155 9.155 0 0 0 9.143-9.143v-27.429h-91.429zM256 512a27.476 27.476 0 0 0 25.862-18.286h-51.723A27.474 27.474 0 0 0 256 512zm118.031-270.25c-6.671-54.43-49.629-97.28-104.076-103.813a124.765 124.765 0 0 0-14.121-.804c-48.118.074-91.444 29.154-109.742 73.657-18.298 44.503-7.957 95.649 26.193 129.548a93.606 93.606 0 0 1 28.857 66.5v13.733h109.714v-13.804a91.54 91.54 0 0 1 27.831-65.424 118.47 118.47 0 0 0 35.343-99.589v-.004z" />
                <path
                    className={lightClass}
                    d="M410.321 127.54l32.321-32.326a18.283 18.283 0 0 0-8.197-30.59 18.283 18.283 0 0 0-17.661 4.732l-32.326 32.321a18.285 18.285 0 0 0 0 25.862c7.237 6.912 18.628 6.912 25.863.001zm83.393 110.174H448c-10.099 0-18.286 8.187-18.286 18.286 0 10.099 8.187 18.286 18.286 18.286h45.714c10.099 0 18.286-8.187 18.286-18.286 0-10.099-8.187-18.286-18.286-18.286zM410.321 384.46a18.288 18.288 0 0 0-30.622 8.184 18.285 18.285 0 0 0 4.761 17.677l32.326 32.321c7.234 6.911 18.623 6.911 25.857 0a18.279 18.279 0 0 0 0-25.858zm-290.965-4.761a18.285 18.285 0 0 0-17.677 4.761l-32.321 32.326a18.279 18.279 0 0 0 0 25.858c7.234 6.911 18.623 6.911 25.857 0l32.326-32.321a18.288 18.288 0 0 0-8.185-30.624zM82.286 256c0-10.099-8.187-18.286-18.286-18.286H18.286C8.191 237.724.01 245.905 0 256c.01 10.095 8.191 18.276 18.286 18.286H64c10.099 0 18.286-8.187 18.286-18.286zm19.393-128.46c7.236 6.911 18.626 6.911 25.862 0a18.285 18.285 0 0 0 0-25.862L95.214 69.357a18.278 18.278 0 0 0-25.857 0 18.279 18.279 0 0 0 0 25.858zM256 82.286c10.099 0 18.286-8.187 18.286-18.286V18.286C274.286 8.187 266.099 0 256 0c-10.099 0-18.286 8.187-18.286 18.286V64c0 10.099 8.187 18.286 18.286 18.286z"
                />
            </svg>
        );
    }
}

export default observer(Icon);
