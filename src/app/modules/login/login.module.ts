import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './containers/login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
