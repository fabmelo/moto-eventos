import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { EventEditComponent } from './containers/event-edit.component';
import { EventEditRoutingModule } from './event-edit-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EventEditComponent],
  imports: [CommonModule, EventEditRoutingModule, SharedModule],
})
export class EventEditModule {}
