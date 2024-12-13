import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginResetComponent } from './containers/login-reset.component';
import { LoginResetRoutingModule } from './login-reset-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginResetComponent],
  imports: [CommonModule, LoginResetRoutingModule, SharedModule],
})
export class LoginResetModule {}
