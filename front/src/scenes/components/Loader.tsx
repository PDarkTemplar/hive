import React, { Component } from 'react';

import { inject } from 'components/Hoc';
import LoaderComp from 'components/Loader';

type Props = {
    loading: boolean;
    text: string;
};

class Loader extends Component<Props> {
    render() {
        const { loading, text } = this.props;

        return <LoaderComp loading={loading} text={text} />;
    }
}

const injected = inject(Loader, x => ({
    text: x.viewModels.commonView.loadingText,
    loading: x.viewModels.commonView.loading,
}));
export default injected;
