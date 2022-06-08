import {
    ActionReducerMap,
    createFeatureSelector
  } from '@ngrx/store';

import * as fromRouter from './router.reducer';

export interface AppState {
    router: fromRouter.RouterFeatureState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.reducer
};

export const selectRouterFeatureState = createFeatureSelector<fromRouter.RouterFeatureState>('router');
