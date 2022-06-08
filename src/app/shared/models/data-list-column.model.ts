import { SortOrder } from 'src/app/+state/app.enum';

export interface DataListColumn {
    category?: string;
    field?: string;
    title?: string;
    show?: boolean;
    sortOrder?: SortOrder;
    helpText?: string;
}
