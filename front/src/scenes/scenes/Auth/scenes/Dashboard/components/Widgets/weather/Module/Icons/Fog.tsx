import React from 'react';
import cn from 'classnames';
import styles from './index.scss';

type Props = {
    className: string;
};

function Fog({ className }: Props) {
    const wrapClass = cn(styles.icon, className);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={wrapClass} viewBox="0 0 100 100">
            <path
                className={styles.fog2}
                d="M90.91 74.547H9.091a4.092 4.092 0 0 1 0-8.183h81.817a4.092 4.092 0 0 1 0 8.183z"
            />
            <path
                className={styles.fog1}
                d="M90.91 58.182H9.091a4.092 4.092 0 0 1 0-8.183h81.817a4.09 4.09 0 1 1 0 8.183z"
            />
            <path d="M70.454 33.638c-3.275 0-6.307.982-8.864 2.64-2.52-10.876-12.22-19.006-23.863-19.006-13.554 0-24.544 10.992-24.544 24.548H5C5 23.747 19.654 9.091 37.727 9.091c12.283 0 22.971 6.776 28.568 16.783 1.359-.231 2.736-.42 4.16-.42 10.682 0 19.744 6.838 23.118 16.366H84.61c-2.83-4.889-8.103-8.182-14.156-8.182z" />
            <path
                className={styles.fog3}
                d="M9.092 82.726h81.817a4.092 4.092 0 0 1 0 8.183H9.092a4.092 4.092 0 0 1 0-8.183z"
            />
        </svg>
    );
}

export default Fog;
