import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRegisterComponent } from './containers/event-register.component';

const routes: Routes = [
  {
    path: '',
    component: EventRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRegisterRoutingModule { }
