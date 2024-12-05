import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

   // Método para registrar un usuario
  // Método para registrar un usuario
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          console.log('User registered successfully:', userCredential);

          // Mostrar un Swal de éxito
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario se registró correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigir al usuario a la página de "Aceptar términos" después de aceptar el mensaje
            this.router.navigate(['/terminos-condiciones']);
          });
        })
        .catch((error) => {
          console.error('Error registering user:', error);

          // Mostrar un Swal de error
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        });
    }
  }
}
