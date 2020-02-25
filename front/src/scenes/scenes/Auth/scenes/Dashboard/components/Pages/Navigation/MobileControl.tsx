import { Component } from 'react';

import { inject } from 'components/Hoc';

import DashboardView from 'store/dashboard/viewModels/Dashboard';

import { SwipeDir } from '~/constants/enums';

type Props = {
    dashboard: DashboardView;
};

class MobileControl extends Component<Props> {
    componentDidMount() {
        document.body.addEventListener('touchstart', this.touchStart);
        document.body.addEventListener('touchmove', this.touchMove);
        document.body.addEventListener('touchend', this.touchEnd);
    }

    componentWillUnmount() {
        document.body.removeEventListener('touchstart', this.touchStart);
        document.body.removeEventListener('touchmove', this.touchMove);
        document.body.removeEventListener('touchend', this.touchEnd);
    }

    touchStart = (e: TouchEvent) => {
        const { dashboard } = this.props;

        dashboard.swipe.start(e);
    };

    touchEnd = (e: TouchEvent) => {
        const { dashboard } = this.props;

        dashboard.swipe.end(e, this.changePage);
    };

    touchMove = (e: TouchEvent) => {
        e.preventDefault();
    };

    changePage = (swipeDir: SwipeDir) => {
        const { dashboard } = this.props;
        if (swipeDir === SwipeDir.left) {
            dashboard.nextPage();
        } else {
            dashboard.previousPage();
        }
    };

    render() {
        return null;
    }
}

export default inject(MobileControl, x => ({
    dashboard: x.viewModels.dashboardView,
}));
