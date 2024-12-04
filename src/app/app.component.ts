import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public items: any[] = [];
  public user: any = null;
  public logado: boolean = false;

  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.authService.getUserProfile().subscribe((u) => {
      this.user = {
        name: u?.displayName,
        email: u?.email,
        photoURL: u?.photoURL,
      };
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        // Usuário não está logado
        this.router.navigate(['/login']);
        this.logado = false;
      } else {
        this.logado = true;
      }
    });
  }

  public logout() {
    this.authService.logout();
  }

  // async ngOnInit() {
  //   if (this.authService.currentUser) {
  //     this.router.navigate(['/home']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  // async addItem() {
  //   if (this.authService.currentUser) {
  //     const docRef = await addDoc(collection(this.firestore, 'items'), { name: 'New Item' });
  //     console.log('Document written with ID: ', docRef.id);

  //     const querySnapshot = await getDocs(collection(this.firestore, 'items'));
  //     this.items = querySnapshot.docs.map(doc => doc.data());

  //   } else {
  //     console.log('User not authenticated');
  //   }
  // }

  // async ngOnInit() {
  //   if (this.authService.currentUser) {
  //     const querySnapshot = await getDocs(collection(this.firestore, 'items'));
  //     this.items = querySnapshot.docs.map(doc => doc.data());
  //   } else {
  //     console.log('User not authenticated');
  //   }
  // }
}
