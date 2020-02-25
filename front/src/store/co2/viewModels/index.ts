import { observable } from 'mobx';
import { IData } from './types';

class Co2 {
    @observable
    data: IData[] = [];

    getData(index: number) {
        return this.data.find(x => x.index === index);
    }
}

export default Co2;
