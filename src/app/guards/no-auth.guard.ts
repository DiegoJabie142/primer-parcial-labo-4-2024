import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Usuario autenticado, redirigir a la página principal
        router.navigate(['/home']);
        observer.next(false);
      } else {
        // Usuario no autenticado, permitir acceso a la ruta
        observer.next(true);
      }
    });
  });
};
