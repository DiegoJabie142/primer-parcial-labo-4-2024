import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { ListadoChoferesComponent } from './listado-choferes/listado-choferes.component';
import { DetalleChoferComponent } from './detalle-chofer/detalle-chofer.component';
import { DetallePaisComponent } from "../choferes/detalle-pais/detalle-pais.component";

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [NavComponent, ListadoChoferesComponent, DetalleChoferComponent, DetallePaisComponent],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css'
})
export class ChoferesComponent {

  countryName = ''; // Cambia esto al país que desees mostrar

  constructor(private authService: FirestoreService, private router: Router) {}

  choferGuardado: any; // Almacena los datos del actor que se guardará

  documentoChofer: string = ''; // Variable para almacenar el número de documento

  cargarDatosChofer(chofer: any) {
    this.choferGuardado = chofer;
    this.documentoChofer = this.choferGuardado.documento;
    this.countryName = this.choferGuardado.pais;
  }

   // Método para cerrar sesión
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
