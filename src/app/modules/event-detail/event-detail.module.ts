import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/components/shared.module';
import { EventDetailComponent } from './containers/event-detail.component';
import { EventDetailRoutingModule } from './event-detail-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EventDetailComponent],
  imports: [CommonModule, EventDetailRoutingModule, SharedModule],
})
export class EventDetailModule {}
