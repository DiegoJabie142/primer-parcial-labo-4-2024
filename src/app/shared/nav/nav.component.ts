import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  logged = false;
  admin = false;

  constructor( private authService: FirestoreService, private router: Router) { }


  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(logged => {
      this.logged = logged;
  
      if (logged) {
        const rol = localStorage.getItem('rol');
        if (rol === 'admin') {
          this.admin = true;
        } else {
          this.admin = false;  // Asegúrate de manejar el caso en que no es admin
        }
      } 

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
  
  redirectToTerminos(){
    this.router.navigate(['/terminos-condiciones']);
  }

  redirect(ruta: string){
    this.router.navigate([ruta]);
  }

}
