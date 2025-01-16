import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-icon-asignar',
  standalone: true,
  imports: [],
  templateUrl: './button-icon-asignar.component.html',
  styleUrl: './button-icon-asignar.component.css',
})
export class ButtonIconAsignarComponent {
  @Input() rucempresa: string = '';
  @Input() idcarga: number = 0;

  @Output() obtenerDetalle = new EventEmitter<{
    rucempresa: string;
    idcarga: number;
  }>();

  ObtenerDetatosInventarios() {
    this.obtenerDetalle.emit({
      rucempresa: this.rucempresa,
      idcarga: this.idcarga,
    });
  }
}
