import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modificar-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './modificar-vehiculo.component.html',
  styleUrl: './modificar-vehiculo.component.css'
})
export class ModificarVehiculoComponent {
  @Input() vehiculo!: any;
  @Output() vehiculoModificado = new EventEmitter<void>();

  vehiculoForm!: FormGroup;

  constructor(private fb: FormBuilder, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detecta cuando cambia el vehículo para edición
    if (changes['vehiculo'] && this.vehiculo) {
      this.inicializarFormulario();
    }
  }

  inicializarFormulario() {
    this.vehiculoForm = this.fb.group({
      nombre: [{ value: this.vehiculo.nombre, disabled: true }],
      tipo: [this.vehiculo.tipo, Validators.required],
      cantidadRuedas: [this.vehiculo.cantidadRuedas, [Validators.required, Validators.max(6)]],
      capacidadPromedio: [this.vehiculo.capacidadPromedio, [Validators.required, Validators.min(2), Validators.max(100)]]
    });
  }

  modificarVehiculo() {
    if (this.vehiculoForm.valid) {
      const vehiculoModificado = { ...this.vehiculoForm.getRawValue(), id: this.vehiculo.id };
      this.firestoreService.actualizarVehiculo(vehiculoModificado).then(() => {
        this.vehiculoModificado.emit();
      });
    }
  }
}
