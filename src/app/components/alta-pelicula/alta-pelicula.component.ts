import { Component } from '@angular/core';
import { TablaActoresComponent } from "./tabla-actores/tabla-actores.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alta-pelicula',
  standalone: true,
  imports: [TablaActoresComponent, ReactiveFormsModule, NgIf],
  templateUrl: './alta-pelicula.component.html',
  styleUrl: './alta-pelicula.component.css'
})
export class AltaPeliculaComponent {

   // Inyectar MatSnackBar
  peliculaForm: FormGroup;

  constructor(private fb: FormBuilder, private firestoreService:FirestoreService, private snackBar: MatSnackBar) {
    this.peliculaForm = this.fb.group({
    nombrePelicula: ['', Validators.required],
    tipoPelicula: ['', Validators.required],
    fechaEstreno: ['', Validators.required],
    cantidadDePublico: [null, [Validators.required, Validators.min(1)]],
    nombreProtagonista: [{ value: '', disabled: true }, Validators.required],
    documentoProtagonista: [{ value: '', disabled: true }, Validators.required],
    fotoPelicula: [null, Validators.required], // Campo para la foto
  });}

  ngOnInit(): void {
    this.firestoreService.traerActores();
  }

  cargarDatosActor(actor: any) {
    this.peliculaForm.patchValue({
      nombreProtagonista: `${actor.nombre} ${actor.apellido}`,
      documentoProtagonista: actor.documento
    });
  }

  onSubmit() {
    if (this.peliculaForm.invalid) {
      this.snackBar.open('Faltan campos por completar.', 'Cerrar', {
        duration: 3000,
        panelClass: ['custom-snackbar'], // Añade una clase personalizada
      });
      return;
    }

    // Subir la foto a Firebase Storage
    const file = this.peliculaForm.get('fotoPelicula')?.value;
    this.firestoreService.uploadFile(file).subscribe({
      next: (url) => {
        const nuevaPelicula = {
          ...this.peliculaForm.value,
          documentoProtagonista: this.peliculaForm.get('documentoProtagonista')?.value,
          nombreProtagonista: this.peliculaForm.get('nombreProtagonista')?.value,
          fotoPelicula: url // Añade la URL de la foto al objeto de la película
        };

        this.firestoreService.saveMovie(nuevaPelicula)
          .then(() => {
            this.snackBar.open('Película guardada con éxito.', 'Cerrar', {
              duration: 3000, // Duración del mensaje
              panelClass: ['custom-snackbar'], // Añade una clase personalizada
            });
            this.peliculaForm.reset(); // Reiniciar el formulario
          })
          .catch(error => {
            this.snackBar.open('Error al guardar la película: ' + error.message, 'Cerrar', {
              duration: 3000,
              panelClass: ['custom-snackbar'], // Añade una clase personalizada
            });
          });
      },
      error: (error) => {
        this.snackBar.open('Error al subir la foto: ' + error.message, 'Cerrar', {
          duration: 3000,
          panelClass: ['custom-snackbar'], // Añade una clase personalizada
        });
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.peliculaForm.patchValue({
      fotoPelicula: file
    });
  }
}