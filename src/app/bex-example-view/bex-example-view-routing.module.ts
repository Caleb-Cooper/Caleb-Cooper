import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleViewComponent } from './containers/example-view/example-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
          path: 'view',
          component: ExampleViewComponent,
          data: {animation: 'view'}
      },
      { path: '', redirectTo: '/template/example-view/view', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BexExampleViewRoutingModule { }
