import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../reducers/router.reducer';
import { Injectable } from "@angular/core";

// Store the required router state
@Injectable()
export class RouteSerialiser
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let routeSignature = '';

    let state: ActivatedRouteSnapshot = routerState.root;

    while (state.firstChild) {
      state = state.firstChild;

      if(state && state.routeConfig){
        routeSignature = state.routeConfig.path;
      } else {
        routeSignature = '';
      }
    }

    const { params } = state;

    return { url, queryParams, params, routeSignature };
  }
}
