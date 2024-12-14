import { Component, inject } from '@angular/core';
import { DadosService } from '@app/core/services/dados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {

  public title = 'Últimos Eventos Cadastrados';
  public eventos: any[] = [];

  private readonly dadosService = inject(DadosService);

  ngOnInit() {
    this.obterEventos();
  }

  public obterEventos(){
    this.dadosService.getRecentEvents().then(
      (user) => {
        this.eventos = user;
      }
    );
  }

}
