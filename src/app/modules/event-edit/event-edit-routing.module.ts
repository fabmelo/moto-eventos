import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventEditComponent } from './containers/event-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EventEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventEditRoutingModule { }
