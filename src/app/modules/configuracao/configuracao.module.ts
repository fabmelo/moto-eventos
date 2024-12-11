import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ConfiguracaoRoutingModule } from './configuracao-routing.module';
import { ConfiguracaoComponent } from './containers/configuracao.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ConfiguracaoComponent],
  imports: [CommonModule, ConfiguracaoRoutingModule, SharedModule],
})
export class ConfiguracaoModule {}
