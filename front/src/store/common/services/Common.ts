import { action, runInAction } from 'mobx';
import MobileDetect from 'mobile-detect';
import debounce from 'debounce';
import constants from '~/constants';

import { ScreenSize } from '~/constants/enums';

import Store from 'store/Store';

class Common {
    private store: Store;

    constructor(globalStore: Store) {
        this.store = globalStore;

        this.getSettings();
        this.heartbitResponse();
        this.settingsInit();

        setInterval(() => {
            runInAction(() => {
                if (
                    (new Date() as any) - (this.store.viewModels.commonView.heartbitDate as any) >
                    15000
                ) {
                    if (this.store.viewModels.authView.authorized) {
                        this.store.viewModels.commonView.loading = true;
                        this.store.viewModels.commonView.setLoadingText('Server unavailable');
                    }
                } else {
                    this.store.viewModels.commonView.loading = false;
                }
            });
        }, 10000);
    }

    @action.bound
    initWidthCalculations() {
        this.calculateWidthInternal();
        this.checkIsMobile();
    }

    calculateWidth = debounce(this.calculateWidthInternal, 300);

    @action.bound
    private calculateWidthInternal() {
        const { commonView } = this.store.viewModels;
        commonView.checkIsPortrait();
        if (document.body.clientWidth < 1000) {
            commonView.size = ScreenSize.small;
        } else {
            commonView.size = ScreenSize.big;
        }
    }

    @action.bound
    checkIsMobile() {
        const { commonView } = this.store.viewModels;
        const mobileDetect = new MobileDetect(window.navigator.userAgent);
        if (mobileDetect.mobile() != null || mobileDetect.tablet() != null) {
            commonView.isMobile = true;
        }
    }

    @action.bound
    private getSettings() {
        this.store.services.mqttService.publish(constants.mqttPathes.settingsRequest);
    }

    @action.bound
    private heartbitResponse() {
        this.store.services.mqttService.subscribe(constants.mqttPathes.heartbitResponse, () => {
            this.store.viewModels.commonView.heartbitDate = new Date();
        });
    }

    private settingsInit() {
        this.store.services.mqttService.subscribe(constants.mqttPathes.settingsInit, () => {
            this.store.viewModels.commonView.loading = false;
        });
    }
}

export default Common;
