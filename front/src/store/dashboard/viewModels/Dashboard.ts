import { observable, action, computed, when, IReactionDisposer } from 'mobx';
import hash from 'js-sha1';

import { serialize, deserialize } from 'serializr';
import { INode } from './Types';
import Page from './Page';
import Swipe from './Swipe';
import SaveData from './SaveData';

class Dashboard {
    @observable
    pages: Page[] = [new Page()];

    @observable
    editPages: Page[] = [];

    @observable
    edit: boolean = false;

    @observable
    deleteMode: boolean = false;

    @observable
    currentPageIndex: number = 0;

    @observable
    nodes: INode[] = [];

    @observable
    deletePageAlertOpen: boolean = false;

    @observable
    addWidgetOpen: boolean = false;

    @observable
    drawerOpen: boolean = false;

    @observable
    saveConfirmationOpen: boolean = false;

    @observable
    loading: boolean = true;

    @observable
    dirty: boolean = false;

    drawerComponent: JSX.Element | null = null;

    swipe: Swipe = new Swipe();

    dirtyHash: string = '';

    dirtyReactionDisposer?: IReactionDisposer;

    @computed
    get currentPage(): Page {
        return this.edit
            ? this.editPages[this.currentPageIndex]
            : this.pages[this.currentPageIndex];
    }

    @computed
    get canDeletePage() {
        return this.editPages.length > 1;
    }

    @computed
    get totalPages() {
        return this.edit ? this.editPages.length : this.pages.length;
    }

    @action.bound
    private checkDirty() {
        this.dirtyReactionDisposer = when(
            () => {
                const newHash = hash(
                    this.editPages.length +
                        JSON.stringify(this.editPages.map(x => x.name)) +
                        JSON.stringify(this.editPages.flatMap(x => x.widgets))
                );

                if (!this.dirtyHash) {
                    this.dirtyHash = newHash;
                    return false;
                }

                if (this.dirtyHash !== newHash) {
                    return true;
                }

                return false;
            },
            () => {
                this.dirty = true;
            }
        );
    }

    @action.bound
    closeDrawer() {
        this.drawerOpen = false;
        this.drawerComponent = null;
    }

    @action.bound
    openDrawer(drawerComponent: JSX.Element | null) {
        this.drawerOpen = true;
        this.drawerComponent = drawerComponent;
    }

    @action.bound
    openAddWidget() {
        this.addWidgetOpen = true;
    }

    @action.bound
    closeAddWidget() {
        this.addWidgetOpen = false;
    }

    @action.bound
    closeSaveConfirmation() {
        this.saveConfirmationOpen = false;
    }

    @action.bound
    closeWithoutSave() {
        this.saveConfirmationOpen = false;
        this.setEdit(false);
    }

    @action.bound
    setEdit(edit: boolean) {
        this.edit = edit;
        if (edit) {
            const saveData = new SaveData(this.pages);
            const data: any = deserialize(SaveData, serialize(saveData));
            this.editPages = (data as SaveData).pages;
            this.checkDirty();
        } else {
            this.dirty = false;
            this.dirtyHash = '';
            this.editPages = [];
            if (this.dirtyReactionDisposer) {
                this.dirtyReactionDisposer();
            }
            this.setDeleteMode(false);
        }
    }

    @action.bound
    setDeleteMode(deleteMode: boolean) {
        this.deleteMode = deleteMode;
    }

    @action.bound
    openDeletePageAlert() {
        this.deletePageAlertOpen = true;
    }

    @action.bound
    closeDeletePageAlert() {
        this.deletePageAlertOpen = false;
    }

    @action.bound
    delete() {
        this.closeDeletePageAlert();
        this.editPages.splice(this.currentPageIndex, 1);
        this.currentPageIndex -= 1;
        if (this.currentPageIndex < 0) {
            this.currentPageIndex = this.editPages.length - 1;
        }
    }

    @action.bound
    add() {
        this.editPages.push(new Page());
    }

    @action.bound
    nextPage() {
        let nextIndex = this.currentPageIndex + 1;
        if (nextIndex > this.totalPages - 1) {
            nextIndex = 0;
        }

        this.currentPageIndex = nextIndex;
    }

    @action.bound
    previousPage() {
        let nextIndex = this.currentPageIndex - 1;
        if (nextIndex < 0) {
            nextIndex = this.totalPages - 1;
        }

        this.currentPageIndex = nextIndex;
    }

    @action.bound
    setIndex(index: number) {
        this.currentPageIndex = index;
    }

    findNode(id: string) {
        return this.nodes.find(x => x.id === id);
    }
}

export default Dashboard;
