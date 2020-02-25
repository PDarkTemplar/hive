import React, { ReactNode } from 'react';

import { ScreenSize } from '~/constants/enums';

type Props = {
    size: ScreenSize;
    children: ReactNode;
};

function ValueRender({ size, children }: Props) {
    if (size === ScreenSize.small) {
        return <h3>{children}</h3>;
    }

    return <h1>{children}</h1>;
}

export default ValueRender;
