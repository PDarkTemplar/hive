import { serializable, list, object } from 'serializr';
import Page from './Page';

class SaveData {
    @serializable(list(object(Page)))
    pages: Page[] = [];

    constructor(pages: Page[]) {
        this.pages = pages;
    }
}

export default SaveData;
