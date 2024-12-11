import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class MaskPhoneDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    const formattedValue = this.formatPhoneNumber(value);
    input.value = formattedValue;
  }

  private formatPhoneNumber(value: string): string {
    if (value.length > 10) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
    } else if (value.length > 5) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6, 10)}`;
    } else if (value.length > 2) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}`;
    } else {
      return value;
    }
  }
}
