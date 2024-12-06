import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import IMask from 'imask';

@Directive({
  selector: '[appMask]'
})
export class MaskDirective implements OnInit {
  @Input('appMask') mask: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    IMask(this.el.nativeElement, { mask: this.mask });
  }
}
