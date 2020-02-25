import React, { PureComponent, ReactNode } from 'react';

import styles from './index.scss';

type Props = {
    children: ReactNode;
};

class Carousel extends PureComponent<Props> {
    render() {
        const { children } = this.props;

        return (
            <div className={styles.wrap}>
                {React.Children.map(children, (child, i) => {
                    if (
                        !child ||
                        typeof child === 'string' ||
                        typeof child === 'number' ||
                        typeof child === 'boolean'
                    )
                        return child;
                    return React.cloneElement(child as any, { index: i });
                })}
            </div>
        );
    }
}

export default Carousel;
export { default as Tab } from './Tab';
