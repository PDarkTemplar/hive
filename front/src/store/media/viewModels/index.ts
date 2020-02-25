import { observable } from 'mobx';
import { IStatus, Action } from './types';

class Media {
    @observable
    data: IStatus = { action: Action.off };
}

export default Media;
