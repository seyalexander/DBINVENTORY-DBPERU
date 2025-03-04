import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SeguridadModel } from '../../../../../../../Domain/models/seguridad/seguridad.model';
import { DetalleUsuarioPageComponent } from '@modules/configuration/Usuarios/page/detalle-usuario-page/detalle-usuario-page.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReqActualizarUsuario } from 'src/app/Domain/models/seguridad/requestActualizarusuario.mode';
import Swal from 'sweetalert2';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MensajeRolesModel } from 'src/app/Domain/models/roles/mensajeRoles.model';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';
import { RolesService } from 'src/app/Infraestructure/driven-adapter/roles/roles.service';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TarjetaUsuarioEnviarComponent } from '../../tarjeta/tarjeta-usuario-enviar/tarjeta-usuario-enviar.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'table-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    TdEstado2Component,
    TdEstado1Component,
    MatMenuModule,
    ActualizarUsuarioPageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    DetalleUsuarioPageComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSortModule,
    TarjetaUsuarioEnviarComponent
  ],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsuariosComponent {
  switchControl = new FormControl(true);

  value = '';

  DatosRoles: Array<RolesModel> = [];
  DatosEmpresas: Array<EmpresasModel> = [];

  private rolesSubscription: Subscription | undefined;
  private actualizarUsuario: Subscription | undefined;
  private empresasSubscription: Subscription | undefined;

  constructor(private readonly _usuarios: SeguridadService) {}

  private readonly _roles = inject(RolesService);
  private readonly _empresas = inject(EmpresasService);
  private readonly ObjectUsuario = inject(GetUsuariosByIdUseCases);
  private _liveAnnouncer = inject(LiveAnnouncer);

  datosSeguridadDetalle: SeguridadModel = {} as SeguridadModel;
  ObjtEmpresa: EmpresasModel = {} as EmpresasModel;

  displayedColumns: string[] = [
    'cargo',
    'rucempresa',
    'estado1',
    'estado',
    'nombreusuario',
    'apellido',
    'clave',
    'copy',
    'opciones'
  ];

  @ViewChild(TarjetaUsuarioEnviarComponent) tarjetaComponent!: TarjetaUsuarioEnviarComponent;

  copiarTarjeta(usuario: any) {
    this.tarjetaComponent.usuario = usuario;
    setTimeout(() => this.tarjetaComponent.copiarImagen(), 100);
  }

  ngOnInit(): void {
    this.listaRoles('1');
    this.listaEmpresas();
  }

  listaRoles(estado: string) {
    this.rolesSubscription = this._roles
      .ListarRoles(estado)
      .subscribe((response: MensajeRolesModel) => {
        this.DatosRoles = response.roles;
      });
  }

   listaEmpresas() {
      this.empresasSubscription = this._empresas
        .ListarEmpresas()
        .subscribe((response: MensajeResponseEmpresas) => {
          this.DatosEmpresas = response.empresas;
        });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   announceSortChange(sortState: Sort) {
        if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }



  cambiarEstadoUsuario(usuario: SeguridadModel) {
    const nuevoEstado = usuario.estado === '1' ? '0' : '1';

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
        window.location.reload();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
      },
    });
  }

  @Input() DatosUsuario: Array<SeguridadModel> = [];

  dataSource = new MatTableDataSource<SeguridadModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosUsuario']) {
      this.dataSource.data = this.DatosUsuario || [];
    }
  }

  abrirModalEditar = '';
  ObtenerEditarsuario(idusuario: string) {
    if (idusuario != '') {
      this.abrirModalEditar = '#modalActualizarUsuario';
      const reqDatos: RequestDetalleUsuario = { idusuario };
      this.actualizarUsuario = this.ObjectUsuario.detalleUsuario(
        reqDatos
      ).subscribe((response: SeguridadModel) => {
        this.datosSeguridadDetalle = response;
      });
    } else {
      this.abrirModalEditar = '';
    }
  }

  abrirModalDetalle = '';
  @ViewChild(DetalleUsuarioPageComponent) detalleUsuarioComponent!: DetalleUsuarioPageComponent;

private cdRef = inject(ChangeDetectorRef);

ObtenerDetalleUsuario(usuario: SeguridadModel) {
  if (this.detalleUsuarioComponent) {
    this.detalleUsuarioComponent.datosUsuario = usuario;
    this.cdRef.detectChanges(); // 🔹 Forzar la actualización del DOM
  }

  // 🔹 Abrimos el modal después de asignar los datos
  const modalElement = document.getElementById('detalleUsuario');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

  // ObtenerDetalleUsuario(idusuario: string) {
  //   if (idusuario != '') {
  //     const reqDatos: RequestDetalleUsuario = { idusuario };
  //     this.actualizarUsuario = this.ObjectUsuario.detalleUsuario(
  //       reqDatos
  //     ).subscribe((response: SeguridadModel) => {
  //       this.datosSeguridadDetalle = response;
  //       this.abrirModalDetalle = '#detalleUsuario';
  //     });
  //   } else {
  //     this.abrirModalEditar = '';
  //   }
  // }

  // ====================================================================
  // EDITAR SOLO NOMBRE
  // ====================================================================

  editarNombre(usuario: any) {
    usuario.editando = true;
    usuario.nombreTemporal = usuario.nombreusuario;
  }

  guardarNombre(usuario: any) {
    usuario.editando = false;
    usuario.nombreusuario = usuario.nombreTemporal;
    this.actualizarNombreUsuario(usuario);
  }

  actualizarNombreUsuario(usuario: SeguridadModel) {
    const formActualizar: ReqActualizarUsuario = {
      rucempresa: usuario.rucempresa,
      idusuario: usuario.idusuario,
      nombreusuario: usuario.nombreTemporal ?? '',
      apellido: usuario.apellido,
      cargo: usuario.cargo,
      contrasenia: usuario.contrasenia,
      usuariomodificador: sessionStorage.getItem('user') ?? 'System',
      estado: usuario.estado,
    };

    this._usuarios.actualizarUsuario(formActualizar).subscribe({
      next: () => {
        usuario.nombreusuario = usuario.nombreTemporal ?? '';
        window.location.reload();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el nombre', 'error');
      },
    });
  }

  // ====================================================================
  // EDITAR SOLO APELLIDO
  // ====================================================================

  editarApellidos(usuario: any) {
    usuario.editandoApellido = true;
    usuario.apellidoTemporal = usuario.apellido;
  }

  guardarApellidos(usuario: any) {
    usuario.editandoApellido = false;
    usuario.apellido = usuario.apellidoTemporal;
    this.actualizarNombreUsuario(usuario);
  }

  actualizarApellidosUsuario(usuario: SeguridadModel) {
    const formActualizar: ReqActualizarUsuario = {
      rucempresa: usuario.rucempresa,
      idusuario: usuario.idusuario,
      nombreusuario: usuario.nombreusuario,
      apellido: usuario.apellidoTemporal ?? '',
      cargo: usuario.cargo,
      contrasenia: usuario.contrasenia,
      usuariomodificador: sessionStorage.getItem('user') ?? 'System',
      estado: usuario.estado, // Mantiene el estado actual
    };

    this._usuarios.actualizarUsuario(formActualizar).subscribe({
      next: () => {
        usuario.nombreusuario = usuario.nombreTemporal ?? '';
        window.location.reload();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el nombre', 'error');
      },
    });
  }

  // ====================================================================
  // EDITAR SOLO CARGO
  // ====================================================================

  cerrarEdit(usuario: any) {
    usuario.editandoCargo = false;
  }

  editarCargo(usuario: any) {
    usuario.editandoCargo = true;
    usuario.cargoTemporal = usuario.cargo;
  }

  guardarCargo(usuario: any) {
    usuario.editandoCargo = false;
    usuario.cargo = usuario.cargoTemporal;
    this.actualizarCargoUsuario(usuario);
  }

  actualizarCargoUsuario(usuario: SeguridadModel) {
    const formActualizar: ReqActualizarUsuario = {
      rucempresa: usuario.rucempresa,
      idusuario: usuario.idusuario,
      nombreusuario: usuario.nombreusuario,
      apellido: usuario.apellido,
      cargo: usuario.cargoTemporal ?? '',
      contrasenia: usuario.contrasenia,
      usuariomodificador: sessionStorage.getItem('user') ?? 'System',
      estado: usuario.estado,
    };

    this._usuarios.actualizarUsuario(formActualizar).subscribe({
      next: () => {
        usuario.cargo = usuario.cargoTemporal ?? '';
        usuario.editandoCargo = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el cargo', 'error');
      },
    });
  }

  // ====================================================================
  // EDITAR SOLO CARGO
  // ====================================================================

  cerrarEditEmpresa(usuario: any) {
    usuario.editandoEmpresa = false;
  }

  editarEmpresa(usuario: any) {
    usuario.editandoEmpresa = true;
    usuario.empresaTemporal = usuario.rucempresa;
  }

  guardarEmpresa(usuario: any) {
    usuario.editandoEmpresa = false;
    usuario.rucempresa = usuario.empresaTemporal;
    this.actualizarEmpresaUsuario(usuario);
  }

  actualizarEmpresaUsuario(usuario: SeguridadModel) {
    const formActualizar: ReqActualizarUsuario = {
      rucempresa: usuario.empresaTemporal ?? '',
      idusuario: usuario.idusuario,
      nombreusuario: usuario.nombreusuario,
      apellido: usuario.apellido,
      cargo: usuario.cargo,
      contrasenia: usuario.contrasenia,
      usuariomodificador: sessionStorage.getItem('user') ?? 'System',
      estado: usuario.estado,
    };

    this._usuarios.actualizarUsuario(formActualizar).subscribe({
      next: () => {
        usuario.rucempresa = usuario.empresaTemporal ?? '';
        usuario.editandoEmpresa = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar la empresa', 'error');
      },
    });
  }


    // ====================================================================
  // EDITAR SOLO CONTRASEÑA
  // ====================================================================

  editarContrasenia(usuario: any) {
    usuario.editandocontrasenia = true;
    usuario.contraseniaTemporal = usuario.contrasenia;
    console.log(usuario.contrasenia);
    console.log(usuario.contraseniaTemporal);

  }

  guardarContrasenia(usuario: any) {
    usuario.editandocontrasenia = false;
    usuario.contrasenia = usuario.contraseniaTemporal;
    this.actualizarContraseniaUsuario(usuario);
  }

  actualizarContraseniaUsuario(usuario: SeguridadModel) {
    const formActualizar: ReqActualizarUsuario = {
      rucempresa: usuario.rucempresa,
      idusuario: usuario.idusuario,
      nombreusuario: usuario.nombreusuario,
      apellido: usuario.apellido,
      cargo: usuario.cargo,
      contrasenia: usuario.contraseniaTemporal ?? '',
      usuariomodificador: sessionStorage.getItem('user') ?? 'System',
      estado: usuario.estado, // Mantiene el estado actual
    };

    this._usuarios.actualizarUsuario(formActualizar).subscribe({
      next: () => {
        usuario.contrasenia = usuario.contraseniaTemporal ?? '';
        usuario.editandocontrasenia = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error');
      },
    });
  }

  ngOnDestroy(): void {
    this.actualizarUsuario?.unsubscribe();
    this.rolesSubscription?.unsubscribe();
    this.empresasSubscription?.unsubscribe()
  }
}
