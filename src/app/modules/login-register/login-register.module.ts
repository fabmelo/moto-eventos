import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginRegisterComponent } from './containers/login-register.component';
import { LoginRegisterRoutingModule } from './login-register-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginRegisterComponent],
  imports: [CommonModule, LoginRegisterRoutingModule, SharedModule],
})
export class LoginRegisterModule {}
