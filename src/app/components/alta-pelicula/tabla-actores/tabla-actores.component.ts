import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tabla-actores',
  standalone: true,
  imports: [NgFor ],
  templateUrl: './tabla-actores.component.html',
  styleUrl: './tabla-actores.component.css'
})
export class TablaActoresComponent {

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
