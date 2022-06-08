import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './effects/message.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('message', reducers),
     EffectsModule.forFeature([MessageEffects])
  ],
  declarations: []
})
export class MessageStateModule { }
