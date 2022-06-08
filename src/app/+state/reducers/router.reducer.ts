import { Params } from '@angular/router';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  routeSignature: string;
}
export interface RouterFeatureState extends RouterReducerState<RouterStateUrl> { }

export const reducer = routerReducer;

export const getUrl = (state: RouterStateUrl) => state && state.url;
export const getQueryParams = (state: RouterStateUrl) => state && state.queryParams;
export const getParams = (state: RouterStateUrl) => state && state.params;
export const getRouteSignature = (state: RouterStateUrl) => state && state.routeSignature;
