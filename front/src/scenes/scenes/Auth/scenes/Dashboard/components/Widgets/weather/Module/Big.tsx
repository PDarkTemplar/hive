import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';

import CurrentWeather from './CurrentWeather';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Big extends Component<Props> {
    render() {
        const { service } = this.props;

        if (!service) return null;

        const { weather, convertDate } = service.getWeather;
        if (!weather) return null;

        return (
            <CurrentWeather
                size={ScreenSize.big}
                weather={weather.currently}
                convertDate={convertDate}
                showTime={false}
            />
        );
    }
}

export default observer(Big);
