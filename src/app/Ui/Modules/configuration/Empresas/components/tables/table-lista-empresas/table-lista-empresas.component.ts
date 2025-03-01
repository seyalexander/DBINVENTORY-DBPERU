import { Component, ViewChild } from '@angular/core';
import { EmpresasService } from '../../../../../../../Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from '../../../../../../../Domain/models/empresas/empresas.model';
import { Subscription } from 'rxjs';
import { BodyTableEstadoActivoComponent } from '../../header/body-table/body-table-estado-activo/body-table-estado-activo.component';
import { BodyTableEstadoInactivoComponent } from '../../header/body-table/body-table-estado-inactivo/body-table-estado-inactivo.component';
import { DetalleEmpresaComponent } from '../../modals/detalle-empresa/detalle-empresa.component';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { RegistroEmpresaComponent } from '@modules/configuration/Empresas/page/registro-empresa/registro-empresa.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DetalleEmpresaPageComponent } from '@modules/configuration/Empresas/page/detalle-empresa-page/detalle-empresa-page.component';
import { RequestDetalleEmpresa } from 'src/app/Domain/models/empresas/RequestDetalleEmpresa.model';
import { Sucursales } from 'src/app/Domain/models/empresas/sucursales.model';
import { RequestObtenerSucursales } from 'src/app/Domain/models/empresas/RequestObtenerSucursal.model';
import { ResponseObtenerSucursales } from 'src/app/Domain/models/empresas/ResponseObtenerSucursales.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'table-lista-empresas',
  standalone: true,
  imports: [
    CommonModule,
    RegistroEmpresaComponent,
    BodyTableEstadoActivoComponent,
    BodyTableEstadoInactivoComponent,
    DetalleEmpresaComponent,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DetalleEmpresaPageComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './table-lista-empresas.component.html',
  styleUrl: './table-lista-empresas.component.css'
})
export class TableListaEmpresasComponent {

  displayedColumns: string[] = [
      'rucempresa',
      'razonsocial',
      'fecharegistro',
      'Estado',

    ];

    dataSource = new MatTableDataSource<EmpresasModel>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }




  private empresasSubscription: Subscription | undefined;
  private sucursalesSubscription: Subscription | undefined;
  private empresaDetalleSubscription: Subscription | undefined;

  detalleEmpresa: EmpresasModel = {} as EmpresasModel
  sucursales: Array<Sucursales> = []

  DatosEmpresas: Array<EmpresasModel> = [];
  cantidadEmpresas: number = 0
  cantidadSucursales: number = 0
  p: number = 1;

  constructor(
    private readonly _empresas: EmpresasService,
  ) {}

  ngOnInit(): void {
    this.listaEmpresas()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listaEmpresas() {
    this.empresasSubscription = this._empresas
    .ListarEmpresas()
    .subscribe((response: MensajeResponseEmpresas) => {
      this.dataSource.data = response.empresas
      this.cantidadEmpresas = response.empresas.length

    });
  }

  DetalleEmpresas(rucEmpresa: string) {
    const reqDatos: RequestDetalleEmpresa = { rucEmpresa };
    this.empresaDetalleSubscription = this._empresas
    .DetalleEmpresa(reqDatos)
    .subscribe((response: EmpresasModel) => {
      this.detalleEmpresa = response
      const estado = response.estado
      const rucEmpresa = response.rucempresa
      this.ObtenerSucursales(rucEmpresa,estado)
    });
  }

  ObtenerSucursales(rucempresa: string, estado: string) {
    const reqSucursal: RequestObtenerSucursales = {estado,rucempresa }
      this.sucursalesSubscription = this._empresas.ListaSucursales(reqSucursal).subscribe(
        (response: ResponseObtenerSucursales) => {
          this.sucursales = response.sucursales
        }
      )
  }

  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
  }

  ngOnDestroy(): void {
    if (this.empresasSubscription) {
      this.empresasSubscription.unsubscribe();
    }

    this.empresaDetalleSubscription?.unsubscribe()
    this.sucursalesSubscription?.unsubscribe()
  }

}
