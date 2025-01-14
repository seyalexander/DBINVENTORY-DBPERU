import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'opcion-table-asignar-usuario',
  standalone: true,
  imports: [],
  templateUrl: './opcion-table-asignar-usuario.component.html',
  styleUrl: './opcion-table-asignar-usuario.component.css'
})
export class OpcionTableAsignarUsuarioComponent {
  @Input() rucempresa: string = ''
  @Input() idcarga: number = 0

  @Output() obtenerDetalle = new EventEmitter<{ rucempresa: string; idcarga: number }>();

  ObtenerDetatosInventarios() {
    this.obtenerDetalle.emit({ rucempresa: this.rucempresa, idcarga: this.idcarga });
  }
}
