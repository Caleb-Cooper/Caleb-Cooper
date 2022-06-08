import { DataListColumn } from './data-list-column.model';

export interface DataListView {
    viewName?: string;
    default?: boolean;
    columns?: DataListColumn[];
}
