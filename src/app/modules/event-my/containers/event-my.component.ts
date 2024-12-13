import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-event-my',
  templateUrl: './event-my.component.html',
  styleUrls: ['./event-my.component.scss'],
})
export class EventMyComponent implements OnInit {

  public title = 'Meus Eventos';
  public eventos: any[] = [];

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.obterEventos();
  }

  public obterEventos(){
    this.authService.getUserEvents().then(
      (user) => {
        this.eventos = user;
      }
    );
  }

  public detalheEvento(id: any) {
    this.router.navigate(['/event-detail', id]);
  }

  public editarEvento(id: any) {
    this.router.navigate(['/event-edit', id]);
  }

}
