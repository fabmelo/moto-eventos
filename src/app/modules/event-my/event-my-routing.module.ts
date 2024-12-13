import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventMyComponent } from './containers/event-my.component';

const routes: Routes = [
  {
    path: '',
    component: EventMyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMyRoutingModule { }
