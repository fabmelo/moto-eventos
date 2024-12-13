import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ToastController } from '@ionic/angular';

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
  private readonly toastController = inject(ToastController);
  private readonly router = inject(Router);

  constructor() {
    this.criarFormulario();
  }

  async apresentaToast(message: string) {
    const toast = await this.toastController.create({
      color:'warning',
      message: message,
      duration: 5000,
      position: 'bottom',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }

  public reset() {
    this.authService.resetSenha(this.form.get('email')?.value)
    .then(async () => {
      await this.apresentaToast('Email de redefinição de senha enviado!');
      this.router.navigate(['/login']);
    })
    .catch(async (error) => {
      await this.apresentaToast('Erro ao redefinir senha: ' + error);
      this.router.navigate(['/login']);
    });
  }

  private criarFormulario() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
    });
  }
}
