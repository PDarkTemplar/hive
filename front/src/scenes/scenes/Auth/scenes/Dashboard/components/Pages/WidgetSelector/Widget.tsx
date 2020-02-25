import React, { Component, ReactNode } from 'react';

import { inject } from 'components/Hoc';

import PageView from 'store/dashboard/viewModels/Page';
import { INodeModelConstructor } from '~/store/dashboard/viewModels/Types';
import ModuleWrap, { Size } from '~/components/ModuleWrap';

import styles from './index.scss';

type Props = {
    page: PageView;
    model: INodeModelConstructor;
    id: string;
    name: string;
    children: ReactNode;
};

class Widget extends Component<Props> {
    click = () => {
        const { page, model, id, name } = this.props;
        const Model = model;
        page.addWidget(new Model(id, name));
    };

    render() {
        const { children } = this.props;
        return (
            <ModuleWrap className={styles.widgetAnimation} size={Size.s} onClick={this.click}>
                {children}
            </ModuleWrap>
        );
    }
}

export default inject(Widget, x => ({
    page: x.viewModels.dashboardView.currentPage,
}));
