import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { passwordValidator } from '@app/core/utils/password.validator';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {

  public title = 'Registro de Usuário';
  public form!: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.criarFormulario();
  }

  public register() {
    this.authService.register(this.form.get('email')?.value, this.form.get('password')?.value, this.form.get('nome')?.value);
  }

  private criarFormulario() {
    this.form = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, passwordValidator()]),
    });
  }
}
