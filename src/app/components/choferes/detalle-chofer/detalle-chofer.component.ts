import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-chofer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detalle-chofer.component.html',
  styleUrl: './detalle-chofer.component.css'
})
export class DetalleChoferComponent {
  @Input() chofer: any;
}
