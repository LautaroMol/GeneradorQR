import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app'
import {provideFirestore, getFirestore} from '@angular/fire/firestore'

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
  importProvidersFrom([
    provideFirebaseApp(() =>initializeApp({
      apiKey: "AIzaSyAF6aPR8wOBmS_wMAff4eJsio2AEzthpZs",
      authDomain: "qrangular.firebaseapp.com",
      projectId: "qrangular",
      storageBucket: "qrangular.appspot.com",
      messagingSenderId: "433831653327",
      appId: "1:433831653327:web:8e304ff485ba3cce04ecba"
    }) 
    ),
    provideFirestore (() => getFirestore()),
  ])]
};
