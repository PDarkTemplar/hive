import { observable, action, runInAction } from 'mobx';
import { SwipeDir } from '~/constants/enums';

class Swipe {
    @observable
    swipeStarted: boolean = false;

    private startX: number = 0;

    private dist: number = 0;

    private startTime: number = 0;

    private threshold: number = 70;

    private allowedTime: number = 1000;

    private swipeDir: SwipeDir = SwipeDir.none;

    private timeout?: NodeJS.Timeout;

    @action
    start(e: TouchEvent) {
        const touchObj = e.changedTouches[0];
        this.swipeDir = SwipeDir.none;
        this.dist = 0;
        this.startX = touchObj.pageX;
        this.startTime = new Date().getTime();
        this.swipeStarted = true;
        e.preventDefault();

        this.clearTimeout();

        this.timeout = setTimeout(() => {
            runInAction(() => {
                this.swipeStarted = false;
            });
        }, this.allowedTime);
    }

    @action
    end(e: TouchEvent, callback: (swipeDir: SwipeDir) => void) {
        const touchObj = e.changedTouches[0];
        this.dist = touchObj.pageX - this.startX;
        const elapsedTime = new Date().getTime() - this.startTime;
        if (elapsedTime <= this.allowedTime && Math.abs(this.dist) >= this.threshold) {
            this.swipeDir = this.dist < 0 ? SwipeDir.left : SwipeDir.right;
        }
        if (this.swipeDir !== SwipeDir.none) {
            this.swipeStarted = false;
            this.clearTimeout();
            callback(this.swipeDir);
        }
    }

    private clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
    }
}

export default Swipe;
