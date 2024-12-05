import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { NgIf } from '@angular/common';
import { NavComponent } from "../../shared/nav/nav.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;  // Definir el formulario

  constructor(
    private fb: FormBuilder,  // FormBuilder para construir el formulario
    private authService: FirestoreService,  // Servicio de autenticación
    private router: Router  // Router para la redirección
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario con email y password
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Validaciones para el email
      password: ['', [Validators.required, Validators.minLength(6)]]  // Validaciones para el password
    });
  }

  // Método para manejar el envío del formulario
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .then(() => {
          console.log('Login exitoso');
          this.router.navigate(['/home']);  // Redirigir después del login
        })
        .catch((error) => {
          console.error('Error al iniciar sesión:', error);
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  // Función que se llama al hacer clic en Chofer
  llenarInformacionEmpleado(): void {
    this.loginForm.patchValue({
      email: 'empleado@gmail.com',
      password: '123456'
    });
  }

  // Función que se llama al hacer clic en Admin
  llenarInformacionAdmin(): void {
    this.loginForm.patchValue({
      email: 'admin@example.com',
      password: '123456'
    });
  }
}
