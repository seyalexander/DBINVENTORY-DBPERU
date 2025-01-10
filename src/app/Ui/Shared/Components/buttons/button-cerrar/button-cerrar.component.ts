import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-cerrar',
  standalone: true,
  imports: [],
  templateUrl: './button-cerrar.component.html',
  styleUrl: './button-cerrar.component.css'
})
export class ButtonCerrarComponent {
  @Input() cerrarModal: string = ''
}
