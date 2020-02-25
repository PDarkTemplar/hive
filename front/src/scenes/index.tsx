import React, { Fragment } from 'react';

import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import Store from 'store/Store';

import Startup from './components/Startup';
import Loader from './components/Loader';
import Background from './components/Background';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import './index.global.scss';

configure({ enforceActions: 'observed' });

function App() {
    return (
        <div className="main-content">
            <Provider store={new Store()}>
                <Fragment>
                    <Background />
                    <Startup />
                    <Loader />
                </Fragment>
            </Provider>
        </div>
    );
}

export default App;
