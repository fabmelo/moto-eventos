import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MenuToggleComponent } from './menu-toggle/menu-toggle.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MenuToggleComponent],
  imports: [CommonModule],
  exports: [MenuToggleComponent],
})
export class SharedModule {}
