import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listado-actores',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './listado-actores.component.html',
  styleUrl: './listado-actores.component.css'
})
export class ListadoActoresComponent {
  actores: any[] = [];  // Almacenar todos los actores

  @Output() actorSeleccionado = new EventEmitter<any>();

  constructor(private firestoreService:FirestoreService) {}
  
   ngOnInit(): void {
    this.firestoreService.traerActores().subscribe((actores: any[]) => {
      this.actores = actores;  // Asigna todos los actores obtenidos
    });
  }

  onSelectActor(actor: any) {
    this.actorSeleccionado.emit(actor);
  }
}
