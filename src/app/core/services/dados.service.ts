import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, limit, orderBy, query, startAfter, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly toastService = inject(ToastService);

  public async obterEventos() {
    const querySnapshot = await getDocs(collection(this.firestore, 'eventos'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  public obterEventosComInfiniteScroll(limitCount: number, startAfterDoc?: any): Observable<any[]> {
    const itemsCollection = collection(this.firestore, 'eventos');
    let q = query(itemsCollection, orderBy('nome'), limit(limitCount));
    if (startAfterDoc) {
      q = query(itemsCollection, orderBy('nome'), startAfter(startAfterDoc), limit(limitCount));
    }
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  public async getUserEvents() {
    const user = this.auth.currentUser;
    if (user) {
      const q = query(collection(this.firestore, 'eventos'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      await this.toastService.apresentaToast('Usuário não autenticado');
      return [];
    }
  }

  public async getRecentEvents() {
    const q = query(
      collection(this.firestore, 'eventos'),
      orderBy('criadoEm', 'desc'),
      limit(2)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

}
