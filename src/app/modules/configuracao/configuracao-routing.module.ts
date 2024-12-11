import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracaoComponent } from './containers/configuracao.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracaoRoutingModule { }
