import React from 'react';

import { inject } from 'components/Hoc';

import CommonView from 'store/common/viewModels/Common';

import PcControl from './PcControl';

type Props = {
    isLeft: boolean;
    common: CommonView;
};

function Navigation({ isLeft, common }: Props) {
    return common.isMobile ? null : <PcControl isLeft={isLeft} />;
}

export default inject(Navigation, x => ({
    common: x.viewModels.commonView,
}));
