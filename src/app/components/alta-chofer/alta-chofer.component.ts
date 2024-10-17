import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { NgFor, NgIf } from '@angular/common';
import { TablaPaisesComponent } from './tabla-paises/tabla-paises.component';
import { NavComponent } from "../../shared/nav/nav.component";

@Component({
  selector: 'app-alta-chofer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, TablaPaisesComponent, NavComponent],
  templateUrl: './alta-chofer.component.html',
  styleUrl: './alta-chofer.component.css'
})
export class AltaChoferComponent {
 // Formulario reactivo para almacenar los datos del chofer
 choferForm!: FormGroup;
  
 selectedCountry: string = ''; // Para almacenar el país seleccionado

 constructor(private fb: FormBuilder, private firestoreService:FirestoreService) {}

 ngOnInit(): void {
   // Inicializar el formulario
   this.choferForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Validación solo letras
      documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]], // Documento debe tener exactamente 8 caracteres
     licencia: ['', [Validators.required, Validators.minLength(7)]], 
     edad: ['', [Validators.required, Validators.min(1)]],
     pais: [{ value: '', disabled: true }, Validators.required],
     licenciaProfesional: [false] 
   });
 }

// Método que se ejecuta cuando se selecciona un país
onCountrySelected(country: string) {
  this.selectedCountry = country;
  
  this.choferForm.patchValue({ pais: country }); // Actualiza el país en el formulario
  
}

 // Método para guardar los datos del chofer y mostrarlos por consola
 guardarChofer() {
  if (this.choferForm.valid) {
    // Recoger los valores, incluyendo los campos deshabilitados
    const choferData = this.choferForm.getRawValue();
    console.log('Datos del chofer:', choferData);
    this.firestoreService.guardarChofer(choferData);
  } else {
    console.log('Formulario inválido');
  }
}
}
