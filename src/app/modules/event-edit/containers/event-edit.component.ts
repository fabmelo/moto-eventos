import { Component, inject, OnInit } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemService } from '@app/core/services/imagem.service';
import { LocationService } from '@app/core/services/location.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent  implements OnInit {

  public title = 'Editar Evento';
  public form!: FormGroup;
  public selectedFile: File | null = null;
  public estados: any[] = [];
  public cidades: any[] = [];
  public localidade: { estado: string; cidade: string } = { estado: '', cidade: '' };
  public dataEvento!: Date | string;
  public evento$: Observable<any> | undefined;
  public localizacao!: SafeHtml;
  public id: string | null = null;
  public previewUrl: string | ArrayBuffer | null = null;

  private cidadesSubject = new BehaviorSubject<any[]>([]);
  public cidades$ = this.cidadesSubject.asObservable();

  private readonly imagemService = inject(ImagemService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly firestore = inject(Firestore);
  private readonly locationService = inject(LocationService);
  private readonly toastController = inject(ToastController);
  private readonly loadingController = inject(LoadingController);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly router = inject(Router);

  public estadoOptions: any = {
    header: 'Selecione um Estado',
  };

  public cidadeOptions: any = {
    header: 'Selecione uma Cidade'
  };


  ngOnInit(): void {    
    this.criarFormulario();
    this.obterEstados();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const eventDocRef = doc(this.firestore, `eventos/${this.id}`);
    this.evento$ = docData(eventDocRef);    
    this.evento$.subscribe(data => {
      const htmlString = data.localizacao;
      this.localizacao = this.domSanitizer.bypassSecurityTrustHtml(htmlString);
      this.atribuirValorFormulario(data);
    });
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
        await this.apresentaToast('Erro ao obter estados: ' + err);
      },
    });
  }  

  public obterCidades(event?: any, origem = 'select', dados?: any) {
    let objectId: any;
    let estado: any;

    if (origem === 'select') {
      objectId = event.detail.value.objectId;
      estado = event.detail.value.name;
    } else if (origem === 'method') {
      objectId = dados.objectId;
      estado = dados.name;
    }

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

        if (origem === 'method'){
          this.cidadesSubject.next(this.cidades);
          this.evento$?.subscribe(data => {
            this.cidades$.subscribe(cidades => {
              if (cidades.length > 0) {
                setTimeout(() => {
                  this.cidades = cidades;
                  this.form.get('cidade')?.setValue(data.cidade);
                }, 1000);
              }
            });
          });
        } else {
          this.form.get('cidade')?.setValue('');
        }
        
        this.localidade = { estado, cidade: '' };

      },
      error: async (err) => {
        await this.apresentaToast('Erro ao obter cidades: ' + err);
      },
    });
  }

  public cancelar() {
    this.router.navigate(['/event-list']);
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

    const loading = await this.showLoading();
    const formData = this.form.value;

    // Obtem cidade e estado selecionados
    formData.cidade = this.localidade.cidade;
    formData.estado = this.localidade.estado;

    if (this.selectedFile) {
      this.imagemService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          // Obtem URL da imagem
          formData.imagem = response.secure_url;
        },
        error: async (err) => {
          await this.apresentaToast('Erro ao fazer upload da imagem: ' + err);
        },
      });
    } else {
      // Se não houver imagem, mantém a imagem anterior
      this.evento$?.subscribe(data => {
        formData.imagem = data.imagem;
      });
    }

    // Salvar evento no firebase
    setTimeout(async () => {
      if (this.id) {
        const documentRef = doc(this.firestore, 'eventos', this.id);
        await updateDoc(documentRef, this.form.value);
      } else {
        await this.apresentaToast('Erro: ID do evento não encontrado.');
      }
      await this.apresentaToast('Evento salvo com sucesso!');
      this.form.reset();
      loading.dismiss();
      this.router.navigate(['/event-list']);
    }, 1000);
    
  }  

  public compareEstadoCom = (c1: any, c2: any): boolean => {

    let isIgual;

    if (typeof c1 === 'string'){
      isIgual  = (c1 && c2) ? c1 === c2.name : c1 === c2;
    } else {
      isIgual = (c1 && c2) ? c1.name === c2.name : c1 === c2;
    }

    if (isIgual && typeof c1 === 'string') {
      this.obterCidades(null, 'method', { objectId: c2.objectId, name: c2.name });        
    }    

    return isIgual;
  }

  public compareCidadeCom(c1: any, c2: any): boolean {

    let isIgual;

    if (typeof c1 === 'string'){
      isIgual  = (c1 && c2) ? c1 === c2.name : c1 === c2;
    } else {
      isIgual = (c1 && c2) ? c1.name === c2.name : c1 === c2;
    }

    return isIgual;
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
      localizacao: this.formBuilder.control('')
    });
  }

  private atribuirValorFormulario(evento: any) {
    this.form.get('uid')?.setValue(evento.uid);
    this.form.get('nome')?.setValue(evento.nome);
    this.form.get('organizador')?.setValue(evento.organizador);
    this.form.get('descricao')?.setValue(evento.descricao);
    this.form.get('estado')?.setValue(evento.estado);
    this.form.get('email')?.setValue(evento.email);
    this.form.get('celular')?.setValue(evento.celular);
    this.form.get('localizacao')?.setValue(evento.localizacao);  
    this.form.get('data')?.setValue(evento.data);  
    this.dataEvento = evento.data;
  }

}
