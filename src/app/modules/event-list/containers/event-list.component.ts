import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { DadosService } from '@app/core/services/dados.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent  implements OnInit {

  private readonly dadosService = inject(DadosService);
  private readonly authService = inject(AuthService);

  public title = 'Todos Eventos';
  public eventos: any[] = [];
  public limit = 10;
  public lastVisible: any;
  public uidLogado: string | undefined = '';
  public hasMoreData = true;

  ngOnInit() {
    this.obterEventos();
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.uidLogado = user?.uid;
      }
    });
  }

  public obterEventos(event?: any) {
    if (!this.hasMoreData) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    this.dadosService.obterEventosComInfiniteScroll(this.limit, this.lastVisible).subscribe(data => {
      if (data.length > 0) {
        this.eventos = this.eventos.concat(data);
        this.lastVisible = data[data.length - 1];
      } else {
        this.hasMoreData = false; // Não há mais dados para carregar
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  public obterMaisEventos(event: any) {
    this.obterEventos(event);
  }

}
