import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BexWrapperComponent } from './bex-wrapper/bex-wrapper.component';


const routes: Routes = [
  {
    path: 'template',
    component: BexWrapperComponent,
    children: [
      {
        path: 'example-input',
        loadChildren: () => import('./bex-example-input/bex-example-input.module').then(m => m.BexExampleInputModule)
      },
      {
        path: 'example-view',
        loadChildren: () => import('./bex-example-view/bex-example-view.module').then(m => m.BexExampleViewModule)
      },
      {
        path: 'example-list',
        loadChildren: () => import('./bex-example-list/bex-example-list.module').then(m => m.BexExampleListModule)
      },
    ]
  },
  { path: '', redirectTo: '/template/example-input/input', pathMatch: 'full' },
  { path: '**', redirectTo: '/template', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
