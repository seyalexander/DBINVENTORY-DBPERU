import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'th-table-carga-inventario',
  standalone: true,
  imports: [],
  templateUrl: './th-table-carga-inventario.component.html',
  styleUrl: './th-table-carga-inventario.component.css'
})
export class ThTableCargaInventarioComponent {
  @Input() descripcion:string = ""
  @Input() ordenar:string = ""
  @Input() icon:boolean = false
  @Output() ordenarDatos = new EventEmitter<{ ordenar: string}>();

  BtnOrdenar() {
    this.ordenarDatos.emit({ ordenar: this.ordenar});
  }
}
