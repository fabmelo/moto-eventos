import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, limit, orderBy, query, startAfter } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private readonly firestore = inject(Firestore);

  public async obterEventos() {
    const querySnapshot = await getDocs(collection(this.firestore, 'eventos'));
    return querySnapshot.docs.map(doc => doc.data());
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

}
