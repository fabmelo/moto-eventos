import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/components/shared.module';
import { EventRegisterComponent } from './containers/event-register.component';
import { EventRegisterRoutingModule } from './event-register-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EventRegisterComponent],
  imports: [
    CommonModule,
    EventRegisterRoutingModule,
    SharedModule,
  ],
})
export class EventRegisterModule {}
