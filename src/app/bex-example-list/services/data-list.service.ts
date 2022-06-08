import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MessageFilter } from '../models/message-filter.model';
import { MessageList } from '../models/message-list.model';
import { SortOrder } from 'src/app/+state/app.enum';
import { DataListView } from 'src/app/shared/models/data-list-view.model';


@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor() { }

  getMessages(messageFilter: MessageFilter): Observable<any> {
    const messages = this.getMockMessages();
    const messageList: MessageList = {
      messages: [],
      pageNumber: messageFilter.pageNumber,
      pageSize: messageFilter.pageSize,
      totalPages: 1,
      totalRecords: messages.length
    };

    if (messages.length % messageFilter.pageSize === 0) {
      messageList.totalPages = Math.floor(messages.length / messageFilter.pageSize);
    } else {
      messageList.totalPages = Math.floor(messages.length / messageFilter.pageSize + 1);
    }
    const firstIndex = messageList.totalRecords >= messageList.pageNumber * messageList.pageSize - messageList.pageSize + 1
                      ? messageList.pageNumber * messageList.pageSize - messageList.pageSize + 1 : 1;
    const lastIndex = messageList.totalRecords > messageList.pageNumber * messageList.pageSize
                      ? messageList.pageNumber * messageList.pageSize : messageList.totalRecords;
    if (messageFilter) {
      messageList.messages = messages.slice(firstIndex - 1, lastIndex);
    }
    return of(messageList).pipe(delay(500));
  }

  getMockMessages() {
    const messages = [];
    for (let i = 1; i <= 55; i++) {
      messages.push({ id: i, first: 'User ' + i, last: 'Name ' + i, message: 'Test message ' + i });
    }
    return messages;
  }

  /**
   * Create view
   */
  createView(view: DataListView): Observable<DataListView> {
    return of(view);
  }

  /**
   * Update view
   */
  updateView(view: DataListView): Observable<DataListView> {
    return of(view);
  }

  /**
   * Get views
   */
  getViews(): Observable<DataListView[]> {
    const views: DataListView[] = [];
    views.push(this.createDefaultView());
    return of(views);
  }

  /**
   * Get default view
   */
  getDefaultView(): Observable<DataListView> {
    return of(this.createDefaultView());
  }

  /**
   * Create default view
   */
  createDefaultView(): DataListView {
    return {
            viewName: 'Default',
            default: true,
            columns: this.setTableColumns()
        };
  }

  /**
   * @description set the tables headers and show only specific fields
   */
  setTableColumns() {
      return [
        { category: 'General', field: 'id', title: 'Message id', show: true, sortOrder: SortOrder.Asc },
        { category: 'General', field: 'first', title: 'First Name', show: true, sortOrder: SortOrder.None },
        { category: 'General', field: 'last', title: 'Last Name', show: true, sortOrder: SortOrder.None },
        { category: 'General', field: 'message', title: 'Message', show: true, sortOrder: SortOrder.None },
      ];
  }

}
