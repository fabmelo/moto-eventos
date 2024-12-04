import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagemService } from '@app/core/services/imagem.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.scss'],
})
export class EventRegisterComponent implements OnInit {
  public title = 'Registrar Evento';
  public form!: FormGroup;
  public selectedFile: File | null = null;

  private readonly imagemService = inject(ImagemService);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.criarFormulario();
  }

  public selecionandoImagem(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  public salvarEvento() {
    if (this.selectedFile) {
      const formData = this.form.value;

      this.imagemService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          formData.image = response.secure_url;
        },
        error: (error) => {
          // TODO: Tratar erro
          console.error(error);
        },
      });
    }
  }

  private criarFormulario() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      image: this.formBuilder.control(''),
    });
  }
}
