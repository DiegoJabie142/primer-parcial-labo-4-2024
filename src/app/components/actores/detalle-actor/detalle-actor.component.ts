import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-actor',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detalle-actor.component.html',
  styleUrl: './detalle-actor.component.css'
})
export class DetalleActorComponent {
  @Input() actor: any;
}
