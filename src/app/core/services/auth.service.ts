import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly toastService = inject(ToastService);

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

  public resetSenha(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  public async loginWithEmailSenha(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      await this.toastService.apresentaToast('Erro ao realizar o login' + error);
    }
  }

  public async register(email: string, password: string, nome: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(this.firestore, `usuarios/${user.uid}`), { nome, email });
      this.router.navigate(['/home']);
    } catch (error) {
      await this.toastService.apresentaToast('Erro ao realizar registro de usuário' + error);
    }
  }

  public async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

}

