import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';
import { MaskPhoneDirective } from './directives/mask-phone.directive';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MenuToggleComponent, MaskPhoneDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MenuToggleComponent, ReactiveFormsModule, MaskPhoneDirective],
})
export class SharedModule {}
