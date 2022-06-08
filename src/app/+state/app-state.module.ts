import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './effects/router.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { RouteSerialiser } from './serialisers/route.serialiser';
import { MessageStateModule } from '../bex-example-list/+state/message-state.module';

@NgModule({
  imports: [
    MessageStateModule,
    StoreModule.forRoot(reducers,
      {
        runtimeChecks: {
          strictActionImmutability: false,
          strictStateImmutability: false
        }

      }
      ),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 10}) : [],
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
  ],
  declarations: [],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerialiser }]
})
export class AppStateModule { }
