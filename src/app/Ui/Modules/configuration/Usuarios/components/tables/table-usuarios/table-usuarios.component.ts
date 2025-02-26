import { ChangeDetectionStrategy, Component, inject, Input, NgModule, SimpleChanges, ViewChild } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ReqActualizarUsuario } from 'src/app/Domain/models/seguridad/requestActualizarusuario.mode';
import Swal from 'sweetalert2';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

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
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsuariosComponent {

  switchControl = new FormControl(true);

  private readonly ObjectUsuario = inject(GetUsuariosByIdUseCases);

  datosSeguridadDetalle: SeguridadModel = {} as SeguridadModel

  displayedColumns: string[] = [
    'cargo',
    'estado',
    'btnestado',
    'nombres',
    'opciones',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(
      private readonly _usuarios: SeguridadService
    ) {}

  cambiarEstadoUsuario(usuario: SeguridadModel) {
    // Alterna entre "1" (activo) y "0" (inactivo)
    const nuevoEstado = usuario.estado === "1" ? "0" : "1";

    const formActualizar: ReqActualizarUsuario = {
      rucempresa: usuario.rucempresa,
      idusuario: usuario.idusuario,
      nombreusuario: usuario.nombreusuario,
      apellido: usuario.apellido,
      cargo: usuario.cargo,
      contrasenia: usuario.contrasenia,
      usuariomodificador: sessionStorage.getItem('user') ?? 'System',
      estado: nuevoEstado,
    };

    this._usuarios.actualizarUsuario(formActualizar).subscribe({
      next: () => {
        usuario.estado = nuevoEstado;
          window.location.reload()
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
      }
    });
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
