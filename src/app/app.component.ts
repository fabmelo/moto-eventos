import { Component } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="addItem()">Add Item</button>
    <ul>
      <li *ngFor="let item of items">{{ item.name }}</li>
    </ul>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: any[] = [];
  constructor(private firestore: Firestore) {}

  async addItem() {
    const docRef = await addDoc(collection(this.firestore, 'items'), { name: 'New Item' });
    console.log('Document written with ID: ', docRef.id);
  }

  async ngOnInit() {
    const querySnapshot = await getDocs(collection(this.firestore, 'items'));
    this.items = querySnapshot.docs.map(doc => doc.data());
  }
}
