import { NgModule } from '@angular/core';
import { ExampleInputComponent } from './containers/example-input/example-input.component';
import { BexExampleInputRoutingModule } from './bex-example-input-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExampleInputComponent,
  ],
  imports: [
    SharedModule,
    BexExampleInputRoutingModule
  ]
})
export class BexExampleInputModule { }
