import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, mergeMap, } from 'rxjs/operators';
import * as MessageActions from '../actions/message.actions';
import { of } from 'rxjs';
import { ToastMessageService } from 'src/app/shared/services/toast-message/toast-message.service';
import { DataListService } from '../../services/data-list.service';
import { DataListView } from 'src/app/shared/models/data-list-view.model';

@Injectable()
export class  MessageEffects {

  fetchMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.FetchMessages),
      switchMap(action =>
        this.dataListService.getMessages(action.messageFilter).pipe(
          map(messageList => MessageActions.FetchingMessagesSuccess({messageList})),
          catchError(error => of(MessageActions.FetchingMessagesFailed()))
        )
      )
    )
  );

  fetchViews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.FetchViews),
    switchMap(action =>
      this.dataListService.getViews().pipe(
        mergeMap(views => {
          let defaultView = views.find((view: DataListView) => {
            return view.default === true;
          });
          if (!defaultView) {
              defaultView = views[0];
          }
          const dispatchActions = [];
          dispatchActions.push(
            MessageActions.SetActiveView({listView: defaultView})
          );
          dispatchActions.push(
            MessageActions.FetchingViewsSuccess({views})
          );
          return dispatchActions;
      }),
        catchError(error => of(MessageActions.FetchingViewsFailed()))
      )
    )
  )
);

fetchDefaultView$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.FetchDefaultView),
    switchMap(action =>
      of(MessageActions.FetchViews())
    )
  )
);

createView$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.CreateView),
    switchMap(action =>
      this.dataListService.createView(action.listView).pipe(
        map(view => MessageActions.CreateViewSuccess({listView: view})),
        catchError(error => of(MessageActions.CreateViewFailed(error)))
      )
    )
  )
);

createViewSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.CreateViewSuccess),
    map(action => {
      this.toastMessageService.success('View successfully created!');
      return MessageActions.SetActiveView({listView: action.listView});
    })
  )
);

createViewFailed$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.CreateViewFailed),
    tap((error: any) => {
      this.toastMessageService.success('View creation failed!');
    })
  ), { dispatch: false }
);

updateView$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.UpdateView),
    switchMap(action =>
      this.dataListService.updateView(action.listView).pipe(
        map(view => MessageActions.UpdateViewSuccess({listView: view})),
        catchError(error => of(MessageActions.UpdateViewFailed(error)))
      )
    )
  )
);

updateViewSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.UpdateViewSuccess),
    map(action => {
      this.toastMessageService.success('View successfully updated!');
      return MessageActions.SetActiveView({listView: action.listView});
    })
  )
);

updateViewFailed$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MessageActions.UpdateViewFailed),
    tap((error: any) => {
      this.toastMessageService.success('View update failed!');
    })
  ), { dispatch: false }
);



  constructor(
    private actions$: Actions,
    private toastMessageService: ToastMessageService,
    private dataListService: DataListService,
  ) {}
}
