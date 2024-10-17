import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, HttpClientModule, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userData: any;

  constructor(private http: HttpClient, private authService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const apiUrl = 'https://api.github.com/users/diegojabie142';
    this.http.get<any>(apiUrl).subscribe(data => {
      this.userData = data;
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada exitosamente.');
      // Redirigir a la página de login
      this.router.navigate(['/Login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
