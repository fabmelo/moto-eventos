import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoComponent {

  @Input() public isAlertOpen: boolean = false;
  @Input() public header: string = '';
  @Input() public subHeader: string = '';
  @Input() public message: string = '';

  @Output() public onIsAlertOpen = new EventEmitter();

  public alertButtons = ['OK'];

  setOpen(isOpen: boolean) {
    this.onIsAlertOpen.emit(isOpen);
  }

}
