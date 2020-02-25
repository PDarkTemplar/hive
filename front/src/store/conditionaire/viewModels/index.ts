import { observable } from 'mobx';
import { IStatuses } from './types';

class Conditionaire {
    @observable
    data: IStatuses[] = [];

    getData(id: number) {
        return this.data.find(x => x.id === id);
    }
}

export default Conditionaire;
