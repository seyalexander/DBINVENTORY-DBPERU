import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'td-table-btn-detalle',
  standalone: true,
  imports: [],
  templateUrl: './td-table-btn-detalle.component.html',
  styleUrl: './td-table-btn-detalle.component.css'
})
export class TdTableBtnDetalleComponent {
  @Input() rucempresa: string = '';
  @Input() idcarga: number = 0;

  @Output() obtenerDetalle = new EventEmitter<{ rucempresa: string; idcarga: number }>();

  ObtenerDetalleInventarios() {
    this.obtenerDetalle.emit({ rucempresa: this.rucempresa, idcarga: this.idcarga });
  }
}
