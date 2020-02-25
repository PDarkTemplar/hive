import React from 'react';
import cn from 'classnames';
import styles from './index.scss';

type Props = {
    className: string;
};

function Sleet({ className }: Props) {
    const wrapClass = cn(styles.icon, className);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={wrapClass} viewBox="0 0 100 100">
            <path
                d="M78.637 79.073v-9.858c4.887-3.117 8.18-8.918 8.18-15.576 0-9.937-7.325-17.998-16.363-17.998-3.273 0-6.307 1.08-8.864 2.905C59.072 26.582 49.37 17.64 37.727 17.64c-13.556 0-24.544 12.09-24.544 27.002 0 7.986 3.171 15.142 8.183 20.081v11.062C11.594 69.557 5 57.96 5 44.642 5 24.76 19.654 8.641 37.727 8.641c12.283 0 22.971 7.453 28.568 18.46 1.359-.253 2.736-.46 4.16-.46C84.01 26.64 95 38.73 95 53.639c0 11.753-6.84 21.721-16.364 25.434z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
            <path
                className={styles.snow1}
                d="M33.636 62.642c2.26 0 4.091 2.016 4.091 4.5 0 2.487-1.83 4.5-4.091 4.5-2.258 0-4.09-2.013-4.09-4.5 0-2.484 1.832-4.5 4.09-4.5z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
            <path
                className={styles.snow2}
                d="M33.636 80.644c2.26 0 4.091 2.014 4.091 4.5 0 2.484-1.83 4.496-4.091 4.496-2.258 0-4.09-2.014-4.09-4.496 0-2.489 1.832-4.5 4.09-4.5z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
            <path
                className={styles.snow3}
                d="M50.002 71.643c2.258 0 4.09 2.014 4.09 4.5 0 2.484-1.832 4.5-4.09 4.5-2.261 0-4.092-2.016-4.092-4.5 0-2.488 1.831-4.5 4.092-4.5z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
            <path
                className={styles.snow4}
                d="M50.002 89.64c2.258 0 4.09 2.016 4.09 4.5 0 2.487-1.832 4.501-4.09 4.501-2.261 0-4.092-2.014-4.092-4.5 0-2.485 1.831-4.5 4.092-4.5z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
            <path
                className={styles.snow5}
                d="M66.363 62.642c2.26 0 4.091 2.016 4.091 4.5 0 2.487-1.83 4.5-4.091 4.5-2.259 0-4.09-2.013-4.09-4.5 0-2.484 1.834-4.5 4.09-4.5z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
            <path
                className={styles.snow6}
                d="M66.363 80.644c2.26 0 4.091 2.014 4.091 4.5 0 2.484-1.83 4.496-4.091 4.496-2.259 0-4.09-2.014-4.09-4.496 0-2.489 1.834-4.5 4.09-4.5z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default Sleet;
