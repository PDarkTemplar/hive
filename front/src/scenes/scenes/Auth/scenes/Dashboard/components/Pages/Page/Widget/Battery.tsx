import React from 'react';

import styles from './index.scss';

type Props = {
    value: number | undefined;
};

function Battery({ value }: Props) {
    if (value == null) return null;

    const style = {
        transform: `scaleX(${value / 100})`,
    };

    return (
        <svg className={styles.battery} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
            <linearGradient id="battery-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop className={styles.batteryFillStart} offset="0%" />
                <stop className={styles.batteryFillStop} offset="100%" />
            </linearGradient>
            <path
                className={styles.batteryOutline}
                d="M56 42.536V36h4V24h-4v-6.536A3.468 3.468 0 0 0 52.536 14H3.464A3.468 3.468 0 0 0 0 17.464v25.072A3.468 3.468 0 0 0 3.464 46h49.072A3.468 3.468 0 0 0 56 42.536zM3.464 44A1.465 1.465 0 0 1 2 42.536V17.464C2 16.656 2.656 16 3.464 16h49.072c.808 0 1.464.656 1.464 1.464V42.536c0 .808-.656 1.464-1.464 1.464z"
            />
            <rect
                className={styles.batteryFill}
                fill="url(#battery-gradient)"
                style={style}
                width="42.715"
                height="19.123"
                x="6.358"
                y="20.464"
                ry="2.181"
            />
        </svg>
    );
}

export default Battery;
