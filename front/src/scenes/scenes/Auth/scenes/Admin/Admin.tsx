import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject } from 'components/Hoc';

import constants from '~/constants';

import CommonService from 'store/common/services/Common';
import CommonView from 'store/common/viewModels/Common';

import Carousel from './components/CarouselVertical';

import ZWave from './components/ZWave';

type Props = {
    service: CommonService;
    model: CommonView;
};

class Admin extends Component<Props> {
    render() {
        const { model } = this.props;

        if (model.isMobile) {
            return <Redirect to={constants.paths.dashboard} />;
        }

        return (
            <Carousel>
                <ZWave />
            </Carousel>
        );
    }
}

const injected = inject(Admin, x => ({
    service: x.services.commonService,
    model: x.viewModels.commonView,
}));

export default injected;
