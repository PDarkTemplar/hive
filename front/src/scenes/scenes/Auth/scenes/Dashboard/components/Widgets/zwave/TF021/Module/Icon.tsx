import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Types, Mode } from '../model/types';

import Service from '../model/Service';
import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    edit?: boolean;
    size: ScreenSize;
};

class Icon extends Component<Props> {
    changeMode = () => {
        const { service, zwaveModel, edit, size } = this.props;

        if (!edit && size !== ScreenSize.small) service.changeMode(zwaveModel);
    };

    render() {
        const { zwaveModel, size } = this.props;

        const valueParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.CurrentTemperature}`
        );

        const heatingParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Mode}`
        );

        const setParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.SetTemperature}`
        );

        const energyParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.EnergyTemperature}`
        );

        const stemp = setParam ? setParam.value : 0;
        const etemp = energyParam ? energyParam.value : 0;
        const cmode = heatingParam ? heatingParam.value : Mode.Off;

        const setShowTemp = cmode === Mode.Heat ? stemp : etemp;
        const compareNumber = Number(setShowTemp);

        const heating = !!(
            heatingParam &&
            (heatingParam.value === Mode.EnergyHeat || heatingParam.value === Mode.Heat)
        );
        const value = valueParam ? Number(valueParam.value) : 0;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
            [styles.normal]: value === compareNumber || !heating,
            [styles.heat]: value < compareNumber && heating,
            [styles.cool]: value > compareNumber && heating,
        });

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={iconClass}
                onClick={this.changeMode}
                viewBox="0 0 512 512"
            >
                <path d="M395.678 220.567H116.322c-3.135 0-5.678 2.454-5.678 5.48v26.305c0 3.027 2.543 5.48 5.678 5.48h42.017v35.622H147.23c-12.19 0-22.107 9.587-22.107 21.372 0 11.786 9.917 21.373 22.107 21.373h11.109v20.825H147.23c-12.19 0-22.107 9.587-22.107 21.373 0 11.785 9.917 21.372 22.107 21.372h11.109v20.825H147.23c-12.19 0-22.107 9.587-22.107 21.373 0 11.785 9.917 21.372 22.107 21.372h11.109v32.333c0 3.027 2.543 5.48 5.678 5.48h22.712c3.135 0 5.678-2.453 5.678-5.48V463.34h127.186v32.333c0 3.027 2.543 5.48 5.678 5.48h22.712c3.135 0 5.678-2.453 5.678-5.48V463.34h24.415c3.136 0 5.678-2.454 5.678-5.48 0-3.026-2.542-5.48-5.678-5.48h-24.415v-20.825h10.541c12.19 0 22.107-9.587 22.107-21.372 0-11.786-9.917-21.373-22.107-21.373h-10.541v-13.825c3.172 1.733 7.085 2.798 11.843 2.798h30.174c3.135 0 5.678-2.454 5.678-5.48V226.048c0-3.027-2.543-5.48-5.678-5.48zM158.339 452.38H147.23c-5.928 0-10.751-4.67-10.751-10.412 0-5.742 4.823-10.413 10.751-10.413h11.109zm0-63.57H147.23c-5.928 0-10.751-4.67-10.751-10.412 0-5.742 4.823-10.413 10.751-10.413h11.109zm0-63.57H147.23c-5.928 0-10.751-4.67-10.751-10.413 0-5.741 4.823-10.412 10.751-10.412h11.109zm223.063-93.711l-14.966 14.444-14.965-14.444zm-45.991 0l22.996 22.194-26.038 25.13-26.038-25.13 22.996-22.194zm-22.145 0l-14.965 14.444-14.966-14.444zm-45.99 0l22.995 22.194-26.038 25.13-26.037-25.13 22.995-22.194zm5.243 70.803c-5.304.14-10.653.275-15.873-.642 1.313-1.27 5.684-6.9 7.597-7.078.05-.005.099-.005.145-.003 1.962.126 6.664 6.312 8.13 7.723zm-16.316-15.727l-8.396 8.104c-3.592-5.415-4.517-11.927-4.655-13.062a34.225 34.225 0 0 0-1.228-8.823zm-11.072-55.076l-14.966 14.444-14.965-14.444zm-10.544 61.926h-42.18v-35.621c10.16 0 20.884-1.371 29.505 4.903 4.977 3.65 8.29 9.034 9.429 14.95 1.044 5.426 1.174 10.47 3.246 15.768zM122 246.872v-15.344h9.004l15.898 15.344zm40.03-.9l-14.966-14.444h29.931zm19.02 244.22h-11.355v-232.36h11.356zm-3.893-243.32l15.899-15.344h6.084l17.135 16.538a37.68 37.68 0 0 0-9.458-1.194zM319.593 452.38H192.407v-20.825h127.186zm0-31.785H192.407v-20.825h127.186zm0-31.785H192.407v-20.825h127.186zm0-31.785H192.407v-20.825h127.186zm0-31.785H192.408v-20.825h48.802a27.835 27.835 0 0 0 2.523 2.453c5.015 4.278 11.161 6.447 18.27 6.447 0 0 57.445.026 57.592.045zm-11.573-22.885h-19.438l-16.319-15.75 26.038-25.13 26.037 25.13zm22.93 187.838V316.89c.109.057.218.11.328.168 7.348 3.94 10.92 9.876 10.92 18.148l.107 154.987zm5.447-182.925c-4.858-2.534-9.71-3.783-12.868-4.38l8.84-8.533 26.037 25.13-6.22 6.004c-2.349-7.792-7.693-13.997-15.79-18.221zm27.805 92.502c5.928 0 10.751 4.671 10.751 10.413 0 5.741-4.822 10.412-10.75 10.412H353.66v-20.825zm1.302-32.947c-11.21 0-11.921-10.018-11.95-11.99v-15.163l12.882-12.434 23.563 22.743v16.844zM390 334.477l-15.533-14.992L390 304.493zm0-45.485l-23.564 22.743-26.037-25.131 26.037-25.13L390 284.215zm0-20.277l-15.533-14.993L390 238.73z" />
                <path
                    opacity={!heating ? 0 : 1}
                    d="M203.031 18.899s-42.905 20.778-45.577 41.246c-4.133 31.652 59.308 33.792 56.664 65.688-2.262 27.279-49.273 62.634-49.273 62.634M278.223 18.467s-42.906 20.778-45.578 41.246c-4.132 31.652 59.309 33.792 56.664 65.689-2.261 27.278-49.273 62.633-49.273 62.633M355.828 19.656s-42.906 20.778-45.578 41.246c-4.132 31.652 59.309 33.792 56.664 65.688-2.261 27.279-49.273 62.634-49.273 62.634"
                    strokeWidth="14.986"
                />
            </svg>
        );
    }
}

export default observer(Icon);
