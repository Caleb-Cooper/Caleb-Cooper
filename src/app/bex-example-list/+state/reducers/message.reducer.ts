import { createReducer, on, Action } from '@ngrx/store';
import * as messageActions from '../actions/message.actions';
import { MessageList } from '../../models/message-list.model';
import { MessageFilter } from '../../models/message-filter.model';
import { Message } from '../../models/message.model';
import { DefaultTablePageSize } from 'src/app/+state/app.const';
import { DataListView } from 'src/app/shared/models/data-list-view.model';


export interface MessageState {
  message?: Message;
  messageListLoading?: boolean;
  messageList?: MessageList;
  messageFilter?: MessageFilter;
  views?: DataListView[];
  defaultView?: DataListView;
}

export const initialState = {
  message: {},
  messageList: {
    messages: [],
    pageSize: DefaultTablePageSize,
    pageNumber: 1,
    totalPages: 0,
    totalRecords: 0
  },
  messageFilter: {
    pageNumber: 1,
    pageSize: DefaultTablePageSize
  },

  defaultView: {
    columns: []
  }
} as MessageState;


const messageReducer = createReducer(initialState,
  on(messageActions.FetchMessages, (state, action) => {
    return {
      ...state,
      messageListLoading: true,
    };
  }),
  on(messageActions.FetchingMessagesSuccess, (state, action) => {
    return {
      ...state,
      messageListLoading: false,
      messageList: action.messageList
    };
  }),
  on(messageActions.FetchingMessagesFailed, (state, action) => {
    return {
      ...state,
      messageListLoading: false,
      messageList: {
        messages: [],
        pageNumber: 1,
        totalPages: 0,
        totalRecords: 0
      }
    };
  }),
  on(messageActions.SetFilter, (state, action) => {
    return {
      ...state,
      messageFilter: action.messageFilter
    };
  }),
  on(messageActions.FetchingViewsSuccess, (state, action) => {
    return {
      ...state,
      views: action.views
    };
  }),
  on(messageActions.FetchingViewsFailed, (state, action) => {
    return {
      ...state,
      views: []
    };
  }),
  on(messageActions.FetchingDefaultViewSuccess, (state, action) => {
    return {
      ...state,
      defaultView: action.listView
    };
  }),
  on(messageActions.FetchingDefaultViewFailed, (state, action) => {
    return {
      ...state,
      defaultView: {}
    };
  }),
  on(messageActions.SetActiveView, (state, action) => {
    return {
      ...state,
      defaultView: action.listView
    };
  }),
);

export function reducer(state: MessageState | undefined, action: Action) {
  return messageReducer(state, action);
}

export const getMessage = (state: MessageState) => state.message;
export const getMessageListLoading = (state: MessageState) => state.messageListLoading;
export const getMessageList = (state: MessageState) => state.messageList;
export const getMessageFilter = (state: MessageState) => state.messageFilter;
export const getViews = (state: MessageState) => state.views;
export const getDefaultView = (state: MessageState) => state.defaultView;
