import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginResetComponent } from './containers/login-reset.component';

const routes: Routes = [
  {
    path: '',
    component: LoginResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginResetRoutingModule { }
