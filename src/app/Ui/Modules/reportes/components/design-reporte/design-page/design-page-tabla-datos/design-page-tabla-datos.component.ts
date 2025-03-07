import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'design-page-tabla-datos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgClass,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './design-page-tabla-datos.component.html',
  styleUrl: './design-page-tabla-datos.component.css'
})
export class DesignPageTablaDatosComponent implements AfterViewInit {
  @Input() listaProductos: Array<detalleCarga> = [];
  @Input() columnasSeleccionadas: string[] = [];

  dataSource = new MatTableDataSource<detalleCarga>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.updateColumns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['listaProductos'] || changes['columnasSeleccionadas']) {
      this.updateColumns();
      this.dataSource.data = this.listaProductos || [];

      this.cdr.detectChanges();
    }
  }
  constructor(private cdr: ChangeDetectorRef) {}
  updateColumns() {
    // Si no hay columnas seleccionadas, establece las predeterminadas
    if (!this.columnasSeleccionadas || this.columnasSeleccionadas.length === 0) {
      this.columnasSeleccionadas = [
        'codigoproducto',
        'codigobarra',
        'descripcionProducto',
        'unidad',
        'stockL',
        'stockF',
        'stockresultante',
        'ajuste'
      ];
    }

    this.displayedColumns = [...this.columnasSeleccionadas];
  }
}
