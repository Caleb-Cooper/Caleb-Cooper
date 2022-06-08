import { DataList } from './data-list.model';

export interface ItemList extends DataList {
    items?: any;
    keyword?: string;
    sortBy?: string;
}
