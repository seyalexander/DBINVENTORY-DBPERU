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
    console.log(this.columnasSeleccionadas);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnasSeleccionadas']) {
      this.filterColumns();
    }
  }

  filterColumns() {
    if (!this.listaProductos || !Array.isArray(this.listaProductos)) {
      this.filteredProducts = [];
      return;
    }

    if (!this.columnasSeleccionadas || !Array.isArray(this.columnasSeleccionadas)) {
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
