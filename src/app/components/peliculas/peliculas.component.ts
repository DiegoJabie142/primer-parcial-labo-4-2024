import { Component, EventEmitter, Output } from '@angular/core';
import { TablaPeliculasComponent } from "./tabla-peliculas/tabla-peliculas.component";
import { DetallePeliculasComponent } from './detalle-peliculas/detalle-peliculas.component';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [TablaPeliculasComponent, DetallePeliculasComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {

  peliculaGuardada: any; // Almacena los datos de la película que se guardará


  cargarDatosPelicula(pelicula: any) {
    this.peliculaGuardada = pelicula;
    console.log(this.peliculaGuardada);
  }
}
