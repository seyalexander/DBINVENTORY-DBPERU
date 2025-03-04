import { NgClass } from '@angular/common';
import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'design-page-tabla-datos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgClass
  ],
  templateUrl: './design-page-tabla-datos.component.html',
  styleUrl: './design-page-tabla-datos.component.css'
})
export class DesignPageTablaDatosComponent implements AfterViewInit {
  @Input() listaProductos: Array<detalleCarga> = []
  @Input() columnasSeleccionadas: string[] = [];

  filteredProducts: any[] = [];



  ngOnInit(): void {
    this.filterColumns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // ================================================================================
  // DATOS PARA TABLA DE ANGULAR MATERIAL
  // ================================================================================
  displayedColumns: string[] = [
    'codigoproducto',
    'codigobarra',
    'descripcionProducto',
    'unidad',
    'stockL',
    'stockF',
    'stockresultante',
    'almacen',
    'sucursal',
    'zona',
    'pasillo',
    'rack',
    'ubicacion',
    'esagrupado',
    'codigogrupo'
  ];

  dataSource = new MatTableDataSource<detalleCarga>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['listaProductos'] || changes['columnasSeleccionadas']) {
      this.filterColumns();
      this.dataSource.data = this.listaProductos || [];
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

    this.displayedColumns = [...this.columnasSeleccionadas];

  }


}
