import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromMessage from '../reducers/message.reducer';

export const selectMessageState = createSelector(fromRoot.selectMessageFeatureState, (state) => state.message);
export const selectMessage = createSelector(selectMessageState, fromMessage.getMessage);
export const selectMessageListLoading = createSelector(selectMessageState, fromMessage.getMessageListLoading);
export const selectMessageList = createSelector(selectMessageState, fromMessage.getMessageList);
export const selectMessageFilter = createSelector(selectMessageState, fromMessage.getMessageFilter);
export const selectViews = createSelector(selectMessageState, fromMessage.getViews);
export const selectDefaultView = createSelector(selectMessageState, fromMessage.getDefaultView);
