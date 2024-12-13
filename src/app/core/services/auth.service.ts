import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly toastController = inject(ToastController);

  public user$: Observable<any>;

  constructor() {
    this.user$ = authState(this.auth).pipe(
      switchMap(async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(this.firestore, `usuarios/${user.uid}`));
          return { ...user, ...userDoc.data() };
        } else {
          return null;
        }
      })
    );
  }

  public getUserProfile() {
    return this.user$;
  }

  public async loginWithEmailSenha(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      this.apresentaToast('Erro ao realizar o login' + error);
    }
  }

  public async register(email: string, password: string, nome: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(this.firestore, `usuarios/${user.uid}`), { nome, email });
      this.router.navigate(['/home']);
    } catch (error) {
      this.apresentaToast('Erro ao realizar registro de usuário' + error);
    }
  }

  public async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  public async getUserEvents() {
    const user = this.auth.currentUser;
    if (user) {
      const q = query(collection(this.firestore, 'eventos'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
    } else {
      this.apresentaToast('Usuário não autenticado');
      return [];
    }
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
}

