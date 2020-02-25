import React, { Component } from 'react';
import cn from 'classnames';

import { Button, Intent } from '@blueprintjs/core';
import styles from './index.scss';

type Props = {
    loading: boolean;
    text: string;
};

class Loader extends Component<Props> {
    restart = () => {
        window.location.reload();
    };

    render() {
        const { loading, text } = this.props;

        const loaderWrapClass = cn(styles.loaderWrap, { [styles.hidden]: !loading });

        return (
            <div className={loaderWrapClass}>
                <div className={styles.overlay} />
                <div className={styles.loader}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120.809"
                        height="140.581"
                        viewBox="0 0 20.587 25.818"
                    >
                        <g stroke="#F5F8FA">
                            <path
                                className="path-draw"
                                d="M2.682 6.577v8.075M17.763 6.577v8.075M20.41 16.107l-10.055-5.926L.169 15.776"
                                fill="none"
                                strokeWidth=".7"
                            />
                            <path
                                className={styles.wifi2}
                                d="M-55.97-69.628a3.093 3.126 0 0 1-2.693 1.585 3.093 3.126 0 0 1-2.69-1.588"
                                transform="rotate(-179.197 -23.884 -31.452) skewX(.017)"
                                fill="none"
                                strokeWidth=".7"
                            />
                            <path
                                className={styles.wifi3}
                                d="M-53.747-68.622a5.523 5.582 0 0 1-4.856 3.034 5.523 5.582 0 0 1-4.917-2.93"
                                transform="rotate(-179.197 -23.884 -31.452) skewX(.017)"
                                fill="none"
                                strokeWidth=".7"
                            />
                            <path
                                className={styles.wifi4}
                                d="M-51.237-67.397A8.31 8.4 0 0 1-58.6-62.77a8.31 8.4 0 0 1-7.43-4.518"
                                transform="rotate(-179.197 -23.884 -31.452) skewX(.017)"
                                fill="none"
                                strokeWidth=".7"
                            />
                            <path
                                className={styles.wifi1}
                                d="M-57.925-70.615a.918.928 0 0 1-.695.372.918.928 0 0 1-.725-.309l.684-.618z"
                                transform="rotate(-179.197 -23.884 -31.452) skewX(.017)"
                                strokeWidth=".7"
                                fill="none"
                            />
                            <path
                                className="path-draw"
                                d="M2.682 16.098v9.206l3.033-.017v-3.454M17.726 16.26v9.206l-3.034-.016v-3.454M10.355 17.997v7.673"
                                fill="none"
                                strokeWidth=".7"
                            />
                            <path
                                className="path-draw"
                                d="M12.348 66.78l.085 6.962-5.987 3.555L.374 73.89.29 66.928l5.987-3.555z"
                                transform="matrix(-.28228 0 0 -.28503 12.126 36.06)"
                                fill="none"
                                strokeWidth="2.468"
                            />
                            <path
                                className="path-draw"
                                d="M12.348 66.78l.085 6.962-5.987 3.555L.374 73.89.29 66.928l5.987-3.555z"
                                transform="matrix(-.28228 0 0 -.28503 7.487 39.896)"
                                fill="none"
                                strokeWidth="2.468"
                            />
                            <path
                                className="path-draw"
                                d="M12.348 66.78l.085 6.962-5.987 3.555L.374 73.89.29 66.928l5.987-3.555z"
                                transform="matrix(-.28228 0 0 -.28503 16.464 40.059)"
                                fill="none"
                                strokeWidth="2.468"
                            />
                        </g>
                    </svg>
                    <h2>{text}</h2>
                    <Button onClick={this.restart} intent={Intent.WARNING}>
                        Restart
                    </Button>
                </div>
            </div>
        );
    }
}

export default Loader;
