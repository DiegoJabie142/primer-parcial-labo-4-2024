import { Component } from '@angular/core';
import { AltaVehiculoComponent } from "./alta-vehiculo/alta-vehiculo.component";
import { ListadoVehiculosComponent } from "./listado-vehiculos/listado-vehiculos.component";
import { ModificarVehiculoComponent } from "./modificar-vehiculo/modificar-vehiculo.component";
import { FirestoreService } from '../../services/firestore.service';
import { NgIf } from '@angular/common';
import { BajaVehiculoComponent } from "./baja-vehiculo/baja-vehiculo.component";

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [AltaVehiculoComponent, ListadoVehiculosComponent, ModificarVehiculoComponent, NgIf, BajaVehiculoComponent],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {
  vehiculoEnEdicion: any = null;
  vehiculoAEliminar: any = null;

  constructor(private firestoreService: FirestoreService) {}

  editarVehiculo(vehiculo: any) {
    this.vehiculoEnEdicion = { ...vehiculo }; // Copiar el vehículo para editarlo sin afectar al original
  }

  eliminarVehiculo(vehiculo: any) {
    this.vehiculoAEliminar = { ...vehiculo }; // Copiar el vehículo para editarlo sin afectar al original
  }

  actualizarListado() {
    this.vehiculoAEliminar = null;
    this.vehiculoEnEdicion = null;
  }
  
}
