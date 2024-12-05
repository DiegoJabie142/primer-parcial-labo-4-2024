import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { NgFor, NgIf } from '@angular/common';
import { TablaPaisesComponent } from './tabla-paises/tabla-paises.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-chofer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, TablaPaisesComponent],
  templateUrl: './alta-chofer.component.html',
  styleUrl: './alta-chofer.component.css'
})
export class AltaChoferComponent {
 // Formulario reactivo para almacenar los datos del chofer
 choferForm!: FormGroup;
  
 selectedCountry: string = ''; // Para almacenar el país seleccionado

 constructor(private fb: FormBuilder, private firestoreService:FirestoreService, private router:Router, private snackBar: MatSnackBar) {}

 ngOnInit(): void {
   // Inicializar el formulario
   this.choferForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Validación solo letras
      documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]], // Documento debe tener exactamente 8 números
      licencia: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+$')]],
      edad: ['', [Validators.required, Validators.min(8), Validators.max(50)]],
      pais: [{ value: '', disabled: true }, Validators.required],
      licenciaProfesional: [false] 
   });
 }

  validarSoloLetras(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(event.key)) {
      event.preventDefault(); // Evitar que se escriba el carácter
    }
  }

  validarSoloNumeros(event: KeyboardEvent): void {
    const regex = /^[0-9]$/; // Expresión regular para solo permitir números

    if (!regex.test(event.key)) {
      event.preventDefault(); // Evitar que se escriba el carácter si no es un número
    }
  }

// Método que se ejecuta cuando se selecciona un país
onCountrySelected(country: string) {
  this.selectedCountry = country;
  this.choferForm.patchValue({ pais: country }); // Actualiza el país en el formulario
  
}

 // Método para guardar los datos del chofer y mostrarlos por consola
 guardarChofer() {
  if (this.choferForm.valid && this.selectedCountry != '') {
    // Recoger los valores, incluyendo los campos deshabilitados
    const choferData = this.choferForm.getRawValue();
    console.log('Datos del chofer:', choferData);

    this.firestoreService.guardarChofer(choferData).then(() => {
      // Mostrar SweetAlert de éxito
      Swal.fire({
        title: '¡Éxito!',
        text: 'El chofer ha sido guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      // Limpiar el formulario
      this.choferForm.reset();
    }).catch((error) => {
      // Mostrar SweetAlert de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar el chofer. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

      console.error('Error al guardar el chofer:', error);
    });

  } else {
    // Mostrar SweetAlert para informar sobre formulario inválido
    Swal.fire({
      title: 'Formulario inválido',
      text: 'Por favor, completa todos los campos requeridos antes de guardar.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });

    console.log('Formulario inválido');
  }
}

}
