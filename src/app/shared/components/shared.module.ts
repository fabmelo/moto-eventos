import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuToggleComponent } from './menu-toggle/menu-toggle.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MenuToggleComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MenuToggleComponent, ReactiveFormsModule],
})
export class SharedModule {}
