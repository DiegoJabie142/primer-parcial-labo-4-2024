import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css'
})
export class TablaPeliculasComponent {

  peliculas: any[] = [];  // Almacenar todas las películas

  @Output() peliculaSeleccionada = new EventEmitter<any>();

  constructor(private firestoreService:FirestoreService) {}
  
   ngOnInit(): void {
    this.firestoreService.traerPeliculas().subscribe((peliculas: any[]) => {
      this.peliculas = peliculas;  // Asigna todas las películas obtenidos
    });
  }

  onSelectorPelicula(actor: any) {
    this.peliculaSeleccionada.emit(actor);
  }
}
