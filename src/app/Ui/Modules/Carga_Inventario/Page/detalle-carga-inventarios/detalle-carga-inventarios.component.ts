import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';

@Component({
  selector: 'detalle-carga-inventarios',
  standalone: true,
  imports: [
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    NgClass,
    MatIcon,
    CommonModule
  ],
  templateUrl: './detalle-carga-inventarios.component.html',
  styleUrls: ['./detalle-carga-inventarios.component.css']
})
export class DetalleCargaInventariosComponent {

  displayedColumns: string[] = [
    'almacen',
    'sucursal',
    'zona',
    'pasillo',
    'rack',
    'ubicacion',
    'esagrupado',
    'codgrupo',
    'codigoproducto',
    'codigobarra',
    'descripcionProducto',
    'unidad',
    'stockL'
  ];

  itemsPerPage: number = 10; // Valor predeterminado

  @Input() detalleProductos: Array<detalleCarga> = [];
  dataSource = new MatTableDataSource<detalleCarga>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalleProductos']) {
      this.dataSource.data = this.detalleProductos || [];
      this.updatePaginator();
    }
  }

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.updatePaginator();
  }

  // Método para actualizar el paginador
  updatePaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = 0; // Volver a la primera página
      this.paginator._changePageSize(this.itemsPerPage); // Cambiar el tamaño de la página
    }
  }

  @Input() citaSeleccionada: inventariosModel = {} as inventariosModel;
  @Input() cantidadInventarios: number = 0;

  encabezadoTable: Array<BodyDetalle> = [];
}

interface BodyDetalle {
  matColumnDef: string;
  title: string;
  dato: string;
}
