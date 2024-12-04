import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly angularFireAuth = inject(AngularFireAuth);
  private readonly router = inject(Router);

  public user$: Observable<any>;

  constructor() {
    this.user$ = this.angularFireAuth.authState;
  }

  public loginWithGoogle() {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public getUserProfile() {
    return this.angularFireAuth.authState;
  }

  public logout() {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
