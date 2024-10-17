import { NgIf } from '@angular/common';
import { Component, Input, input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detalle-peliculas',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.css'
})
export class DetallePeliculasComponent {
  @Input() pelicula: any;
}
