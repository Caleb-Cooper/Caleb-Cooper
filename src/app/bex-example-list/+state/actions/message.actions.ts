import { createAction, props } from '@ngrx/store';
import { MessageList } from '../../models/message-list.model';
import { MessageFilter } from '../../models/message-filter.model';
import { DataListView } from 'src/app/shared/models/data-list-view.model';


export const FetchMessages = createAction(
    '[Message] Fetch Messages',
    props<{messageFilter: MessageFilter }>()
);

export const FetchingMessagesSuccess = createAction(
    '[Message] Fetching Messages Success',
    props<{messageList: MessageList }>()
);

export const FetchingMessagesFailed = createAction(
    '[Message] Fetching Messages Failed'
);

export const SetFilter = createAction(
    '[Message] Set Filter',
    props<{messageFilter: MessageFilter }>()
);

export const FetchViews = createAction(
    '[Message] Fetch Views'
);

export const FetchingViewsSuccess = createAction(
    '[Message] Fetching Views Success',
    props<{ views: DataListView[] }>()
);

export const FetchingViewsFailed = createAction(
    '[Message] Fetching Views Failed'
);

export const FetchDefaultView = createAction(
    '[Message] Fetch Default View'
);

export const FetchingDefaultViewSuccess = createAction(
    '[Message] Fetching Default View Success',
    props<{listView: DataListView }>()
);

export const FetchingDefaultViewFailed = createAction(
    '[Message] Fetching Default View Failed'
);

export const CreateView = createAction(
    '[Message] Create View',
    props<{ listView: DataListView }>()
);

export const CreateViewSuccess = createAction(
    '[Message] Create View Success',
    props<{ listView: DataListView }>()
);

export const CreateViewFailed = createAction(
    '[Message] Create View Failed',
    props<{ error: any }>()
);

export const UpdateView = createAction(
    '[Message] Update View',
    props<{ listView: DataListView }>()
);

export const UpdateViewSuccess = createAction(
    '[Message] Update View Success',
    props<{ listView: DataListView }>()
);

export const UpdateViewFailed = createAction(
    '[Message] Update View Failed',
    props<{ error: any }>()
);

export const SetActiveView = createAction(
    '[Message] Set Active View',
    props<{listView: DataListView }>()
);

