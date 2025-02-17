import { Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { SeguridadModel } from '../../../../../../../Domain/models/seguridad/seguridad.model';
import { HeaderTableUsuariosComponent } from '../../header-table-usuarios/header-table-usuarios.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { DetalleUsuarioPageComponent } from '@modules/configuration/Usuarios/page/detalle-usuario-page/detalle-usuario-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TdEstado3Component } from 'src/app/Ui/Shared/Components/tables/td-estado-3/td-estado-3.component';
import { TdEstado2Component } from 'src/app/Ui/Shared/Components/tables/td-estado-2/td-estado-2.component';
import { TdEstado1Component } from 'src/app/Ui/Shared/Components/tables/td-estado-1/td-estado-1.component';
import { MatMenuModule } from '@angular/material/menu';
import { ActualizarUsuarioPageComponent } from '@modules/configuration/Usuarios/page/actualizar-usuario-page/actualizar-usuario-page.component';
import { GetUsuariosByIdUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarioById-useCase';
import { RequestDetalleUsuario } from 'src/app/Domain/models/seguridad/requestDetalleUsuario.mode';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'table-usuarios',
  standalone: true,
  imports: [
    HeaderTableUsuariosComponent,
    FooterComponent,
    DetalleUsuarioPageComponent,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    TdEstado3Component,
    TdEstado2Component,
    TdEstado1Component,
    MatMenuModule,
    ActualizarUsuarioPageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule

  ],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.css',
})
export class TableUsuariosComponent {

  private readonly ObjectUsuario = inject(GetUsuariosByIdUseCases);

  datosSeguridadDetalle: SeguridadModel = {} as SeguridadModel

  displayedColumns: string[] = [
    'cargo',
    'estado',
    'nombres',
    'apellidos',
    // 'detalle',
    'opciones',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @Input() DatosUsuario: Array<SeguridadModel> = [];
  dataSource = new MatTableDataSource<SeguridadModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosUsuario']) {
      this.dataSource.data = this.DatosUsuario || [];
    }
  }

  ObtenerDetalleUsuario(idusuario: string ) {
    const reqDatos: RequestDetalleUsuario = { idusuario };
    this.ObjectUsuario.detalleUsuario(reqDatos).subscribe(
      (response: SeguridadModel) => {
          this.datosSeguridadDetalle = response
      }
    );
  }

}
