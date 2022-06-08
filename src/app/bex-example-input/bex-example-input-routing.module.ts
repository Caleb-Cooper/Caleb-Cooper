import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleInputComponent } from './containers/example-input/example-input.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'input',
        component: ExampleInputComponent,
        data: {animation: 'input'}
      },
     { path: '', redirectTo: '/template/example-input/input', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BexExampleInputRoutingModule { }
