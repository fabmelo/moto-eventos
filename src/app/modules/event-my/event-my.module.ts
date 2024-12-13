import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { EventMyComponent } from './containers/event-my.component';
import { EventMyRoutingModule } from './event-my-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EventMyComponent],
  imports: [CommonModule, EventMyRoutingModule, SharedModule],
})
export class EventMyModule {}
