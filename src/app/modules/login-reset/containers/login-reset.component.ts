import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.scss'],
})
export class LoginResetComponent {

  public title = 'Redefinir Senha';
  public form!: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  constructor() {
    this.criarFormulario();
  }

  public reset() {
    this.authService.resetSenha(this.form.get('email')?.value)
    .then(async () => {
      await this.toastService.apresentaToast('Email de redefinição de senha enviado!');
      this.router.navigate(['/login']);
    })
    .catch(async (error) => {
      await this.toastService.apresentaToast('Erro ao redefinir senha: ' + error);
      this.router.navigate(['/login']);
    });
  }

  private criarFormulario() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
    });
  }
}
