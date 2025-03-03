import { Component, inject, ViewChild } from '@angular/core';
import { EmpresasService } from '../../../../../../../Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from '../../../../../../../Domain/models/empresas/empresas.model';
import { Subscription } from 'rxjs';
import { BodyTableEstadoActivoComponent } from '../../header/body-table/body-table-estado-activo/body-table-estado-activo.component';
import { BodyTableEstadoInactivoComponent } from '../../header/body-table/body-table-estado-inactivo/body-table-estado-inactivo.component';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { RegistroEmpresaComponent } from '@modules/configuration/Empresas/page/registro-empresa/registro-empresa.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DetalleEmpresaPageComponent } from '@modules/configuration/Empresas/page/detalle-empresa-page/detalle-empresa-page.component';
import { RequestDetalleEmpresa } from 'src/app/Domain/models/empresas/RequestDetalleEmpresa.model';
import { Sucursales } from 'src/app/Domain/models/empresas/sucursales.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'table-lista-empresas',
  standalone: true,
  imports: [
    CommonModule,
    RegistroEmpresaComponent,
    BodyTableEstadoActivoComponent,
    BodyTableEstadoInactivoComponent,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DetalleEmpresaPageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './table-lista-empresas.component.html',
  styleUrl: './table-lista-empresas.component.css'
})
export class TableListaEmpresasComponent {

  displayedColumns: string[] = [
    'fechacreacion',
    'rucempresa',
    'razonsocial',
    'estado',
  ];

  dataSource = new MatTableDataSource<EmpresasModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private readonly _empresas = inject(EmpresasService)
  private _liveAnnouncer = inject(LiveAnnouncer);

  private empresasSubscription: Subscription | undefined;
  private empresaDetalleSubscription: Subscription | undefined;

  detalleEmpresa: EmpresasModel = {} as EmpresasModel
  sucursales: Array<Sucursales> = []
  DatosEmpresas: Array<EmpresasModel> = [];
  cantidadEmpresas: number = 0
  cantidadSucursales: number = 0

  ngOnInit(): void {
    this.listaEmpresas()
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage()

  }

  listaEmpresas(): void {
    this.empresasSubscription = this._empresas
      .ListarEmpresas()
      .subscribe((response: MensajeResponseEmpresas) => {
        this.dataSource.data = response.exito ? response.empresas : [];
        this.cantidadEmpresas = this.dataSource.data.length;
      });
  }

  DetalleEmpresas(rucEmpresa: string) {
    const reqDatos: RequestDetalleEmpresa = { rucEmpresa };
    this.empresaDetalleSubscription = this._empresas
      .DetalleEmpresa(reqDatos)
      .subscribe((response: EmpresasModel) => {
        this.detalleEmpresa = response
      });
  }

  ngOnDestroy(): void {
    this.empresasSubscription?.unsubscribe();
    this.empresaDetalleSubscription?.unsubscribe()
  }

}
