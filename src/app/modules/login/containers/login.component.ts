import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public version = environment.version;

  private readonly authService = inject(AuthService);
  private readonly angularFireAuth = inject(AngularFireAuth);
  private readonly router = inject(Router);

  constructor() {
    this.angularFireAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['/home']);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        // TODO - Implementar mensagem de erro
        console.error('Login error', error);
      });
  }
}
