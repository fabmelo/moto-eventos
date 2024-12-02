import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: any[] = [];

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addItem() {
    if (this.authService.currentUser) {
      const docRef = await addDoc(collection(this.firestore, 'items'), { name: 'New Item' });
      console.log('Document written with ID: ', docRef.id);

      const querySnapshot = await getDocs(collection(this.firestore, 'items'));
      this.items = querySnapshot.docs.map(doc => doc.data());

    } else {
      console.log('User not authenticated');
    }
  }

  async ngOnInit() {
    if (this.authService.currentUser) {
      const querySnapshot = await getDocs(collection(this.firestore, 'items'));
      this.items = querySnapshot.docs.map(doc => doc.data());
    } else {
      console.log('User not authenticated');
    }
  }
}
