import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-listado-choferes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listado-choferes.component.html',
  styleUrl: './listado-choferes.component.css'
})
export class ListadoChoferesComponent {
  choferes: any[] = [];  // Almacenar todos los actores

  @Output() choferSeleccionado = new EventEmitter<any>();

  constructor(private firestoreService:FirestoreService) {}
  
   ngOnInit(): void {
    this.firestoreService.traerChoferes().subscribe((choferes: any[]) => {
      this.choferes = choferes;  // Asigna todos los actores obtenidos
    });
  }

  onSelectChofer(chofer: any) {
    this.choferSeleccionado.emit(chofer);
  }
}
