import { Component, Input, SimpleChanges } from '@angular/core';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'design-page-tabla-datos',
  standalone: true,
  imports: [],
  templateUrl: './design-page-tabla-datos.component.html',
  styleUrl: './design-page-tabla-datos.component.css'
})
export class DesignPageTablaDatosComponent {
  @Input() listaProductos: Array<detalleCarga> = []
  @Input() columnasSeleccionadas: string[] = [];

  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.filterColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnasSeleccionadas']) {
      this.filterColumns();
    }
  }

  filterColumns() {
    console.log("LISTA PRODUCTOS PARA EXPORTAR: ",this.listaProductos);

    if (!this.listaProductos || !Array.isArray(this.listaProductos)) {
      // console.warn("listaProductos es undefined o no es un array");
      this.filteredProducts = [];
      return;
    }

    if (!this.columnasSeleccionadas || !Array.isArray(this.columnasSeleccionadas)) {
      // console.warn("columnasSeleccionadas es undefined o no es un array");
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.listaProductos.map(item => {
      const filteredItem: any = {};
      this.columnasSeleccionadas.forEach(columna => {
        filteredItem[columna] = item[columna];
      });
      return filteredItem;
    });
  }

}
