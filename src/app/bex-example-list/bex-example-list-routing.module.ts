import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleListComponent } from './containers/example-list/example-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
     {
      path: 'list',
      component: ExampleListComponent,
      data: {animation: 'list'}
     },
      { path: '', redirectTo: '/template/example-list/list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BexExampleListRoutingModule { }
