import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BexExampleListRoutingModule } from './bex-example-list-routing.module';
import { ExampleListComponent } from './containers/example-list/example-list.component';
import { ShowHideColumnsComponent } from './containers/show-hide-columns/show-hide-columns.component';


@NgModule({
  declarations: [
    ExampleListComponent,
    ShowHideColumnsComponent
  ],
  imports: [
    SharedModule,
    BexExampleListRoutingModule
  ]
})
export class BexExampleListModule { }
