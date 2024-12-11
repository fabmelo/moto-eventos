import { Component, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public form!: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    authState(this.auth).pipe(
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
    ).subscribe();
    this.criarFormulario();
  }

  public login() {
    this.authService.loginWithEmailSenha(this.form.get('email')?.value, this.form.get('password')?.value);
  }

  private criarFormulario() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }
}
