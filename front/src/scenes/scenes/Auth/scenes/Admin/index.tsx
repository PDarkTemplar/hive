import React from 'react';
import { Switch } from 'react-router';

import Admin from './Admin';
import ZwaveEdit from './scenes/ZwaveEdit';
import { AuthorizedRoute } from '~/components/Router';
import constants from '~/constants';

function AdminRoute() {
    return (
        <Switch>
            <AuthorizedRoute exact path={constants.paths.admin} component={Admin} />
            <AuthorizedRoute path={constants.paths.adminZwaveEdit} component={ZwaveEdit} />
        </Switch>
    );
}

export default AdminRoute;
