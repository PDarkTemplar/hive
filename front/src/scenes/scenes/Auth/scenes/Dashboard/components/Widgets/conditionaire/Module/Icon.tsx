import React, { Component } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import Service from '../model/Service';
import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';
import { Mode } from '~/store/conditionaire/viewModels/types';

type Props = {
    service: Service;
    size: ScreenSize;
    id: number;
};

class Icon extends Component<Props> {
    render() {
        const { size, service, id } = this.props;

        const view = service.getStatuses;
        const statuses = view.getData(id);

        if (!statuses) return null;

        const iconClass = cn(styles.icon, {
            [styles.iconSmall]: size === ScreenSize.small,
            [styles.warm]: statuses.mode === Mode.warm && statuses.enabled,
            [styles.cool]: statuses.mode === Mode.cool && statuses.enabled,
        });

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={iconClass}
                viewBox="0 0 333.316 333.316"
            >
                <path d="M315.797 224.574l-5.557-20.818-39.684 10.592-33.572-19.441 41.764-18.377v-19.75l-41.767-18.377 33.572-19.439 39.689 10.59 5.557-20.818-18.861-5.025 19.361-11.197-10.82-18.645-19.324 11.188 5.029-18.855-20.818-5.551-10.588 39.674-33.473 19.338 4.918-45.148-17.061-9.877-36.758 26.892V52.824l29.045-29.018-15.228-15.267-13.816 13.807V0h-21.531v22.346l-13.81-13.807-15.236 15.268 29.045 29.018v38.703l-36.756-26.892-17.061 9.877 4.924 45.148-33.477-19.336-10.59-39.676-20.816 5.553 5.027 18.854-19.32-11.188-10.786 18.644 19.322 11.197-18.857 5.025 5.557 20.818 39.684-10.59L96.3 138.401l-41.771 18.377v19.75l41.768 18.377-33.576 19.441-39.678-10.592-5.557 20.818 18.853 5.025-19.32 11.195 10.787 18.652 19.318-11.18-5.029 18.84 20.818 5.559 10.59-39.682 33.479-19.338-4.924 45.15 17.061 9.879 36.756-26.893V280.5l-29.045 29.004 15.236 15.266 13.809-13.805v22.352h21.531v-22.352l13.816 13.805 15.229-15.266-29.047-29.004v-38.717l36.758 26.893 17.061-9.879-4.92-45.15 33.475 19.338 10.59 39.682 20.818-5.559-5.029-18.838 19.322 11.178 10.82-18.652-19.361-11.193 18.859-5.029zm-68.129-57.92l-33.779 14.885-25.75-14.887 25.746-14.877 33.783 14.879zm-40.52-70.183l-3.975 36.578-25.77 14.93v-29.721l29.745-21.787zm-81.019 0l29.744 21.787v29.721l-25.771-14.93-3.973-36.578zm-40.52 70.183l33.783-14.879 25.748 14.877-25.752 14.887-33.779-14.885zm40.52 70.186l3.973-36.582 25.771-14.924v29.717l-29.744 21.789zm81.019 0l-29.744-21.789v-29.717l25.77 14.924 3.974 36.582z" />
            </svg>
        );
    }
}

export default observer(Icon);
