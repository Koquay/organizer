import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  // },
  // {
  //   path: 'sign-up',
  //   loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  // },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
