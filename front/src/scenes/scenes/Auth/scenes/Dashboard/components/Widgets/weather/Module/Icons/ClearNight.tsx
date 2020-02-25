import React from 'react';
import cn from 'classnames';
import styles from './index.scss';

type Props = {
    className: string;
};

function ClearNight({ className }: Props) {
    const wrapClass = cn(styles.icon, className);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={wrapClass} viewBox="0 0 100 100">
            <path
                className={styles.night}
                d="M50.001 95C25.147 95 5 74.852 5 50 5 25.147 25.147 5 50.002 5c2.832 0 5.592.293 8.278.796a29.96 29.96 0 0 0-.78 6.705c0 16.57 13.434 30 30.003 30a29.96 29.96 0 0 0 6.706-.78c.499 2.69.792 5.446.792 8.281C95 74.852 74.852 95 50 95zm-6.705-74.222C29.959 23.827 20 35.738 20 50c0 16.566 13.43 30 30 30 14.26 0 26.171-9.957 29.22-23.294-18.204-3.39-32.539-17.725-35.925-35.93z"
                clipRule="evenodd"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default ClearNight;
