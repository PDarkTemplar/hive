import { Component } from 'react';

import { inject } from 'components/Hoc';

import CommonService from 'store/common/services/Common';
import CommonView from 'store/common/viewModels/Common';

type Props = {
    service: CommonService;
    model: CommonView;
};

class WidthCalculator extends Component<Props> {
    componentDidMount() {
        const { service, model } = this.props;

        service.initWidthCalculations();

        window.addEventListener('orientationchange', model.checkIsPortrait);
        window.addEventListener('resize', service.calculateWidth, true);
    }

    componentWillUnmount() {
        const { model, service } = this.props;
        window.removeEventListener('orientationchange', model.checkIsPortrait);
        window.removeEventListener('resize', service.calculateWidth, true);
    }

    render() {
        return null;
    }
}

const injected = inject(WidthCalculator, x => ({
    service: x.services.commonService,
    model: x.viewModels.commonView,
}));

export default injected;
