import { CanDeactivateFn } from '@angular/router';
import { AcetarTerminosComponent } from '../components/acetar-terminos/acetar-terminos.component';
import Swal from 'sweetalert2';

export const canDeactivateGuard: CanDeactivateFn<AcetarTerminosComponent> = (component) => {
  const edadInvalida = component.form.get('edad')?.invalid;
  const termsNoMarcado = !component.form.get('terms')?.value;

  if (edadInvalida || termsNoMarcado) {
    // Muestra un Swal con el mensaje adecuado
    Swal.fire({
      title: '¡Atención!',
      text: 'Debes aceptar los términos y condiciones y tener una edad válida para continuar.',
      icon: 'warning',
      showCancelButton: false, // No permitir salir sin aceptar
      confirmButtonText: 'Entendido',
    });
    return false; // No permite la navegación
  }

  return true; // Si todo es válido, permite la navegación
};
