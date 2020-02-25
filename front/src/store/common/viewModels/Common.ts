import { observable, action, reaction } from 'mobx';

import { ScreenSize } from '~/constants/enums';

class Common {
    @observable
    initialized: boolean = false;

    @observable
    loading: boolean = false;

    @observable
    loadingText: string = 'Loading...';

    @observable
    isMobile: boolean = false;

    @observable
    isPortrait: boolean = false;

    @observable
    size: ScreenSize = ScreenSize.big;

    heartbitDate: Date = new Date();

    constructor() {
        reaction(
            () => this.loading,
            loading => {
                if (!loading) {
                    this.setLoadingText();
                }
            }
        );

        this.checkIsPortrait();
    }

    @action.bound
    checkIsPortrait() {
        this.isPortrait =
            (window.screen.orientation.angle === 0 || window.screen.orientation.angle === 180) &&
            window.innerWidth < window.innerHeight;
    }

    @action
    setLoadingText(text: string = 'Loading...') {
        this.loadingText = text;
    }
}

export default Common;
