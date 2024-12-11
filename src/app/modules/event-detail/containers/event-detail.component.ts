import { Component, inject, OnInit } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent  implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly firestore = inject(Firestore);
  private readonly domSanitizer = inject(DomSanitizer);

  public title = 'Evento';
  public id!: string | null;
  public evento$: Observable<any> | undefined;
  public localizacao!: SafeHtml;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const eventDocRef = doc(this.firestore, `eventos/${id}`);
    this.evento$ = docData(eventDocRef);

    this.evento$.subscribe(data => {
      const htmlString = data.localizacao;
      this.localizacao = this.domSanitizer.bypassSecurityTrustHtml(htmlString);
    });
  }

}
