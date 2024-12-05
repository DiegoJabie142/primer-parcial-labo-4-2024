import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-baja-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './baja-vehiculo.component.html',
  styleUrl: './baja-vehiculo.component.css'
})
export class BajaVehiculoComponent {
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
      tipo: [ {value: this.vehiculo.tipo, disabled: true}],
      cantidadRuedas: [{value: this.vehiculo.cantidadRuedas, disabled: true}],
      capacidadPromedio: [{value: this.vehiculo.capacidadPromedio, disabled: true}]
    });
  }

  eliminarVehiculo() {
    if (this.vehiculo && this.vehiculo.id) {
      this.firestoreService.eliminarVehiculo(this.vehiculo.id).then(() => {
        this.vehiculoModificado.emit();  // Emitir el evento para notificar que el vehículo ha sido eliminado
      }).catch(error => {
        console.error('Error al eliminar el vehículo:', error);
      });
    }
  }
}
