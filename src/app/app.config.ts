import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"modeloprimer-4d55f",
      "appId":"1:334600487552:web:abe3c62747aac8ba95dc65",
      "storageBucket":"modeloprimer-4d55f.appspot.com",
      "apiKey":"AIzaSyAHf37O3sHs0wDPKAtLzeS2lkMkPC7b0H4",
      "authDomain":"modeloprimer-4d55f.firebaseapp.com",
      "messagingSenderId":"334600487552",
      "measurementId":"G-4VLXJNMS81"})), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
