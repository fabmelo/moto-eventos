import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosService } from '@app/core/services/dados.service';

@Component({
  selector: 'app-event-my',
  templateUrl: './event-my.component.html',
  styleUrls: ['./event-my.component.scss'],
})
export class EventMyComponent implements OnInit {

  public title = 'Meus Eventos';
  public eventos: any[] = [];

  private readonly dadosService = inject(DadosService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.obterEventos();
  }

  public obterEventos(){
    this.dadosService.getUserEvents().then(
      (user) => {
        this.eventos = user;
      }
    );
  }

}
