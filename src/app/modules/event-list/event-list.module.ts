import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { EventListComponent } from './containers/event-list.component';
import { EventListRoutingModule } from './event-list-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EventListComponent],
  imports: [CommonModule, EventListRoutingModule, SharedModule],
})
export class EventListModule {}
