import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly toastController = inject(ToastController);

  public async apresentaToast(message: any) {
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
}
