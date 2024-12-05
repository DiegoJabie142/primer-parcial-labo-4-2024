import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acetar-terminos',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './acetar-terminos.component.html',
  styleUrl: './acetar-terminos.component.css'
})
export class AcetarTerminosComponent {

  form!: FormGroup; 

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log('Componente cargado'); 
    this.form = this.fb.group({
      edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['/home']);
    }
  }
}
