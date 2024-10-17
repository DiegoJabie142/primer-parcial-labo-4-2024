import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
   onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          console.log('User registered successfully:', userCredential);

          // Redirigir al usuario a una página diferente después del registro exitoso
          this.router.navigate(['/Actores']);
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    }
  }
}
