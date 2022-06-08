import { NgModule } from '@angular/core';
import { ExampleViewComponent } from './containers/example-view/example-view.component';
import { BexExampleViewRoutingModule } from './bex-example-view-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExampleViewComponent
  ],
  imports: [
    SharedModule,
    BexExampleViewRoutingModule
  ]
})
export class BexExampleViewModule { }
