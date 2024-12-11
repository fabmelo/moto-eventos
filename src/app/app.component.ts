import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public items: any[] = [];
  public user: any = null;
  public logado: boolean = false;
  public version = environment.version;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly platform = inject(Platform);

  constructor() {
    this.initializeApp();
    this.authService.getUserProfile().subscribe((u) => {
      this.user = {
        nome: u?.nome,
        email: u?.email
      };
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        // Usuário não está logado
        this.router.navigate(['/login']);
        this.logado = false;
      } else {
        this.logado = true;
      }
    });
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  public logout() {
    this.authService.logout();
  }

}
