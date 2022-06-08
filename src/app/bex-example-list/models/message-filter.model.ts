import { DataFilter } from 'src/app/shared/models/data-filter.model';

export interface MessageFilter extends DataFilter {
    createdDateStartRange?: Date;
    createdDateEndRange?: Date;
    ids?: number[];
    firstNames?: string[];
    LastNames?: string[];
    messages?: string[];
}
