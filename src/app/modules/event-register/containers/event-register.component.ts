import { Component, inject, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { ImagemService } from '@app/core/services/imagem.service';
import { LocationService } from '@app/core/services/location.service';
import { ToastService } from '@app/core/services/toast.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.scss'],
})
export class EventRegisterComponent implements OnInit {

  public title = 'Registrar Evento';
  public form!: FormGroup;
  public selectedFile: File | null = null;
  public estados: any[] = [];
  public cidades: any[] = [];
  public localidade: { estado: string; cidade: string } = { estado: '', cidade: '' };
  public dataHoje!: Date | string;
  public previewUrl: string | ArrayBuffer | null = null;

  private readonly imagemService = inject(ImagemService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly locationService = inject(LocationService);
  private readonly toastService = inject(ToastService);
  private readonly loadingController = inject(LoadingController);

  ngOnInit(): void {
    this.dataHoje = new Date();
    this.dataHoje = this.dataHoje.toISOString().slice(0, 19);
    this.criarFormulario();
    this.obterEstados();
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...'
    });
    await loading.present();
    return loading;
  }

  public obterEstados() {
    this.locationService.getEstados().subscribe({
      next: (data: any) => {
        this.estados = data.results;
        // colocar em ordem alfabética
        this.estados.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      },
      error: async (err) => {
        await this.toastService.apresentaToast('Erro ao obter estados: ' + err);
      },
    });
  }

  public obterCidades(event: any) {
    const objectId = event.detail.value.objectId;
    const estado = event.detail.value.name;

    this.locationService.getCidades(objectId).subscribe({
      next: (data: any) => {
        this.cidades = data.results;
        // colocar em ordem alfabética
        this.cidades.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        this.form.get('cidade')?.setValue('');
        this.localidade = { estado, cidade: '' };
      },
      error: async (err) => {
        await this.toastService.apresentaToast('Erro ao obter cidades: ' + err);
      },
    });
  }

  public defineLocalidade(event: any) {
    this.localidade.cidade = event.detail.value.name;
  }

  public gatilhoInputImagem() {
    const inputImagem = document.getElementById('inputImagem') as HTMLInputElement;
    inputImagem.click();
  }

  public selecionandoImagem(event: any) {
    const file: File = event.target.files[0];
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const filePreview = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result;
      };

      reader.readAsDataURL(filePreview);
    }

    if (file) {
      this.selectedFile = file;
    }
  }

  public async salvarEvento() {
    if (this.selectedFile) {
      const loading = await this.showLoading();      
      const formData = this.form.value;
      // Obtem cidade e estado selecionados
      formData.cidade = this.localidade.cidade;
      formData.estado = this.localidade.estado;
      // Define data de criação do evento
      formData.criadoEm = new Date().toISOString();
      this.imagemService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          // Obtem URL da imagem
          formData.imagem = response.secure_url;
          this.authService.getUserProfile().subscribe({
            next: async (user: any) => {
              // Obtem ID do usuário logado
              formData.uid = user.uid;
              // Salvar evento no firebase
              await addDoc(collection(this.firestore, 'eventos'), formData);
              await this.toastService.apresentaToast('Evento salvo com sucesso!');
              this.form.reset();
              loading.dismiss();
            }
          });
        },
        error: async (error) => {
          loading.dismiss();
          await this.toastService.apresentaToast('Erro ao salvar evento: ' + error);
        },
      });
    }
  }

  private criarFormulario() {
    this.form = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required]),
      organizador: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required]),
      imagem: this.formBuilder.control(''),
      uid: this.formBuilder.control(''),
      data: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control(''),
      estado: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      celular: this.formBuilder.control('', [Validators.required]),
      localizacao: this.formBuilder.control(''),
      criadoEm: this.formBuilder.control(''),
    });
  }
}
