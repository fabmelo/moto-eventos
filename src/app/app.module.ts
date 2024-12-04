// Angular
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Ionic
import { IonicModule } from '@ionic/angular';

// Local
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/components/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Local
    SharedModule,
    AppRoutingModule,

    // Angular
    BrowserModule,
    HttpClientModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Ionic
    IonicModule.forRoot({ mode: 'md' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;

  constructor(
    injector: Injector
  ) {
    AppModule.injector = injector;
  }
}
