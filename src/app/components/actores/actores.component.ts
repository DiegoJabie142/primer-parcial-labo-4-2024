import { Component } from '@angular/core';
import { ListadoActoresComponent } from "./listado-actores/listado-actores.component";
import { DetalleActorComponent } from "./detalle-actor/detalle-actor.component";
import { PeliculasActorComponent } from "./peliculas-actor/peliculas-actor.component";
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actores',
  standalone: true,
  imports: [ListadoActoresComponent, DetalleActorComponent, PeliculasActorComponent],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css'
})
export class ActoresComponent {

  constructor(private authService: FirestoreService, private router: Router) {}

  actorGuardado: any; // Almacena los datos del actor que se guardará

  documentoActor: string = ''; // Variable para almacenar el número de documento

  cargarDatosActor(actor: any) {
    this.actorGuardado = actor;
    this.documentoActor = this.actorGuardado.documento;
  }

   // Método para cerrar sesión
   onLogout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada exitosamente.');
      // Redirigir a la página de login
      this.router.navigate(['/Login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
