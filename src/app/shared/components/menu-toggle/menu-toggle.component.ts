import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss'],
})
export class MenuToggleComponent  implements OnInit {

  @Input() menu!: string;

  constructor() { }

  ngOnInit() {}

}
