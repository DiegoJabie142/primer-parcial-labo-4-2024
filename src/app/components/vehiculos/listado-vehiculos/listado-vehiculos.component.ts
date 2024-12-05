import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-listado-vehiculos',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './listado-vehiculos.component.html',
  styleUrl: './listado-vehiculos.component.css'
})
export class ListadoVehiculosComponent {

  @Output() vehiculoSeleccionado = new EventEmitter<any>();
  @Output() vehiculoSeleccionadoEliminar = new EventEmitter<any>();

  vehiculos$: Observable<any[]>; // Observable para manejar los datos de los vehículos

  constructor(private firestoreService: FirestoreService) {
    this.vehiculos$ = this.firestoreService.traerVehiculos();
  }

  seleccionarVehiculo(vehiculo: any) {
    this.vehiculoSeleccionado = vehiculo;
  }

  cargarVehiculos() {
    this.vehiculos$ = this.firestoreService.traerVehiculos();
  }

  ngOnInit(): void {}

  editarVehiculo(vehiculo: any) {
    this.vehiculoSeleccionado.emit(vehiculo); // Emitimos el vehículo a modificar.
  }

  eliminarVehiculo(vehiculo: any) {
    this.vehiculoSeleccionadoEliminar.emit(vehiculo); // Emitimos el vehículo a modificar.
  }
}
