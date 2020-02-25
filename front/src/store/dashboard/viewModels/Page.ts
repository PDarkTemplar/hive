import { action, observable } from 'mobx';
import { serializable } from 'serializr';
import { INodeModel } from './Types';
import { polymorphArray } from './Polymorphism';

class Page {
    @observable
    @serializable(polymorphArray())
    widgets: INodeModel[] = [];

    @observable
    @serializable
    name?: string = '';

    private pendingUpdateFn: (() => void) | undefined;

    private requestedFrame: number | undefined;

    @observable
    private flip: boolean = false;

    @action.bound
    setName(value: string) {
        this.name = value;
    }

    @action.bound
    addWidget(model: INodeModel) {
        this.widgets.unshift(model);
    }

    @action.bound
    moveWidget(uuid: string, atIndex: number) {
        if (this.flip) return;
        const widget = this.widgets.find(x => x.uuid === uuid);
        if (!widget) return;

        const index = this.widgets.indexOf(widget);

        this.scheduleUpdate(() => {
            this.widgets.splice(index, 1);
            this.widgets.splice(atIndex, 0, widget);
        });
    }

    @action.bound
    cancelFrame() {
        if (this.requestedFrame !== undefined) {
            cancelAnimationFrame(this.requestedFrame);
        }
    }

    findWidgetIndex(uuid: string) {
        return this.widgets.findIndex(x => x.uuid === uuid);
    }

    @action.bound
    private scheduleUpdate(fn: () => void) {
        this.pendingUpdateFn = fn;

        if (!this.requestedFrame) {
            this.requestedFrame = requestAnimationFrame(this.drawFrame);
        }
    }

    @action.bound
    private drawFrame() {
        if (this.pendingUpdateFn) {
            this.pendingUpdateFn();
        }

        this.pendingUpdateFn = undefined;
        this.requestedFrame = undefined;
    }

    @action.bound
    flipStart() {
        this.flip = true;
    }

    @action.bound
    flipFinish() {
        this.flip = false;
    }

    @action.bound
    removeWidget(uuid: string) {
        const widgetIndex = this.widgets.findIndex(x => x.uuid === uuid);
        if (widgetIndex > -1) this.widgets.splice(widgetIndex, 1);
    }
}

export default Page;
