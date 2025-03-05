import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'tabla-ajustes-inventario-datos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgClass,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './tabla-ajustes-inventario-datos.component.html',
  styleUrl: './tabla-ajustes-inventario-datos.component.css'
})
export class TablaAjustesInventarioDatosComponent {
  @Input() listaProductos: Array<detalleCarga> = [];

  dataSource = new MatTableDataSource<detalleCarga>([]);
  displayedColumns: string[] = [
    'codigoproducto',
    'codigobarra',
    'descripcionProducto',
    'unidad',
    'stockL',
    'stockF',
    'stockresultante',
    'ajuste',
    'detalleajuste',
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listaProductos']) {
      this.dataSource.data = this.listaProductos || [];
    }
  }

}
