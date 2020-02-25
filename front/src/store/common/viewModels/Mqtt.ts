import { observable } from 'mobx';

class Mqtt {
    @observable
    initialized: boolean = false;
}

export default Mqtt;
