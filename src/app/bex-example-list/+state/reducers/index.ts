import * as fromMessage from './message.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface MessageFeatureState {
  message: fromMessage.MessageState;
}

export const reducers: ActionReducerMap<MessageFeatureState> = {
  message: fromMessage.reducer
};

export const selectMessageFeatureState = createFeatureSelector<MessageFeatureState>('message');
