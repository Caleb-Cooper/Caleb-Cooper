import { createSelector } from '@ngrx/store';
import * as fromRouter from '../reducers/router.reducer';
import * as fromRoot from '../reducers';


export const selectRouterState = createSelector(fromRoot.selectRouterFeatureState, (state) => state && state.state);
export const selectNavigationId = createSelector(fromRoot.selectRouterFeatureState, (state) => state && state.navigationId);
export const selectCurrentUrl = createSelector(selectRouterState, fromRouter.getUrl);
export const selectQueryParams = createSelector(selectRouterState, fromRouter.getQueryParams);
export const selectParams = createSelector(selectRouterState, fromRouter.getParams);
export const selectRouteSignature = createSelector(selectRouterState, fromRouter.getRouteSignature);
