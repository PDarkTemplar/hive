import React from 'react';

import { inject } from 'components/Hoc';
import { ScreenSize } from '~/constants/enums';
import { INodeService, INodeModel } from '~/store/dashboard/viewModels/Types';
import Common from '~/store/common/viewModels/Common';
import Dashboard from '~/store/dashboard/viewModels/Dashboard';

type Props = {
    dashboardView: Dashboard;
    commonView: Common;
    service: INodeService | null;
    model: INodeModel;
};

function WidgetComponent({ commonView, model, dashboardView, service }: Props) {
    const widget = dashboardView.findNode(model.id);
    if (!widget) return null;

    let Comp = widget.smallComponent;

    if (commonView.size === ScreenSize.big) {
        Comp = widget.bigComponent;
    }

    return <Comp model={model} service={service} edit={dashboardView.edit} />;
}

export default inject(WidgetComponent, x => ({
    dashboardView: x.viewModels.dashboardView,
    commonView: x.viewModels.commonView,
}));
