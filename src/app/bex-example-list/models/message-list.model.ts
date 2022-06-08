import { Message } from './message.model';
import { DataList } from 'src/app/shared/models/data-list.model';

export interface MessageList extends DataList {
    messages?: Message[];
}
