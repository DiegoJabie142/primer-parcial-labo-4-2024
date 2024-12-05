import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'; // Para inyectar dependencias en la función
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta el Router

  return new Observable<boolean>((observer) => {
    // Verificamos si el rol es 'admin' en el localStorage
    const rol = localStorage.getItem('rol');

    if (rol === 'admin') {
      // Si es admin, permite el acceso
      observer.next(true);
    } else {
      // Si no es admin, redirige a la página principal o login
      router.navigate(['/']); // Puedes redirigir a la página que prefieras
      observer.next(false);
    }
  });
};
