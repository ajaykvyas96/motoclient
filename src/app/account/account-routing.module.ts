import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthlayoutComponent } from '../layout/authlayout/authlayout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      { path: '',redirectTo: '/dashboard' , pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
  }
  // {
  //   path: 'login',
  //   component: AuthlayoutComponent,
  //   children: [
  //     { path: '', component: LoginComponent }
  //   ]
  // },
  // {
  //   path: 'register',
  //   component: AuthlayoutComponent,
  //   children: [
  //       { path: '', component: RegistrationComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
