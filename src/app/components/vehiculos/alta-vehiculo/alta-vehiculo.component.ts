import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FirestoreService } from '../../../services/firestore.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-alta-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './alta-vehiculo.component.html',
  styleUrl: './alta-vehiculo.component.css'
})
export class AltaVehiculoComponent {
  vehiculoForm!: FormGroup;

  constructor(private fb: FormBuilder, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.vehiculoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)]],
      tipo: ['', Validators.required],
      cantidadRuedas: ['', [Validators.required, Validators.min(0), Validators.max(6)]],
      capacidadPromedio: ['', [Validators.required, Validators.min(2), Validators.max(100)]]
    });
  }

  guardarVehiculo(): void {
    if (this.vehiculoForm.valid) {
      const vehiculoData = this.vehiculoForm.value;

      this.firestoreService.guardarVehiculo(vehiculoData).then(() => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El vehículo ha sido guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.vehiculoForm.reset();
      }).catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al guardar el vehículo. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al guardar vehículo:', error);
      });
    }
  }
}
