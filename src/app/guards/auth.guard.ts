import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'; // Para inyectar dependencias en la función
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth); // Inyecta el servicio Auth de Firebase
  const router = inject(Router); // Inyecta el Router

  return new Observable<boolean>((observer) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Usuario autenticado, permitir acceso a la ruta
        observer.next(true);
      } else {
        // Usuario no autenticado, redirigir a la página de login
        router.navigate(['/Login']);
        observer.next(false);
      }
    });
  });
};
