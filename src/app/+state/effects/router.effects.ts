import { Injectable } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap, withLatestFrom, filter } from 'rxjs/operators';
import * as RouterActions from '../actions/router.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../+state/reducers/';
import * as routerSelectors from '../../+state/selectors/router.selectors';

@Injectable()
export class RouterEffects {

  navigate$ = createEffect(() =>
    this.actions$.pipe(
    ofType(RouterActions.Go),
    map((action) => {
        return ({
          path: action.path,
          query: action.query,
          extras: action.extras
        });
      }
    ),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  ), { dispatch: false });

  navigateBack$ = createEffect(() =>
    this.actions$.pipe(
    ofType(RouterActions.Back),
    tap(() => this.location.back())
  ), { dispatch: false });


  navigateForward$ = createEffect(() =>
   this.actions$.pipe(
    ofType(RouterActions.Forward),
    tap(() => this.location.forward())
    ), { dispatch: false });

  private listenToRouter() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      withLatestFrom(
        this.store$.pipe(select(routerSelectors.selectRouteSignature)),
        this.store$.pipe(select(routerSelectors.selectNavigationId))
      )
    ).subscribe(([event, signature, navigationId]: [NavigationEnd, string, number]) => {
      if (navigationId === event.id) {
        this.store$.dispatch(RouterActions.RouteChange({
          params: { },
          path: signature
        }));
      }
    });
  }
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store$: Store<AppState>
  ) {
    this.listenToRouter();
   }
}
