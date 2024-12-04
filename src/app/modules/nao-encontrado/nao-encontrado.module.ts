import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/components/shared.module';
import { NaoEncontradoComponent } from './containers/nao-encontrado.component';
import { NaoEncontradoRoutingModule } from './nao-encontrado-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NaoEncontradoComponent],
  imports: [CommonModule, NaoEncontradoRoutingModule, SharedModule],
})
export class NaoEncontradoModule {}
