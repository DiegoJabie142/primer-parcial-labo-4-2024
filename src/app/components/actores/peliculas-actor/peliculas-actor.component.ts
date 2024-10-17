import { Component, Input, SimpleChanges } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-peliculas-actor',
  standalone: true,
  imports: [NgFor],
  templateUrl: './peliculas-actor.component.html',
  styleUrl: './peliculas-actor.component.css'
})
export class PeliculasActorComponent {
  
  peliculas: any[] = [];  // Almacenar todos los actores

  @Input() documento!: string; // Recibe el número de documento del actor

  constructor(private firestoreService:FirestoreService) {}
  
  ngOnInit(): void {  
  }

  // Detectar cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documento'] && this.documento) {
      this.cargarDatosPeliculas(this.documento);
      console.log(this.documento);
    }
  }

  cargarDatosPeliculas(documento: any) {
    this.firestoreService.traerPeliculasPorDocumento(this.documento).subscribe((peliculas: any[]) => {
      this.peliculas = peliculas;  // Asigna todas las películas obtenidas
    });
  }
}
