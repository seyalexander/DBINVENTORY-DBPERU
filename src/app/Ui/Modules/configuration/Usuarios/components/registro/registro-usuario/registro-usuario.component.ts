import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/Infraestructure/driven-adapter/roles/roles.service';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';

@Component({
  selector: 'registro-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css',
})
export class RegistroUsuarioComponent {
  // ============================================================ Declaración variables
  DatosEmpresas: Array<EmpresasModel> = [];
  DatosRoles: Array<RolesModel> = [];

  // ============================================================ Injección servicios
  private empresasSubscription: Subscription | undefined;
  private rolesSubscription: Subscription | undefined;

  constructor(
    private readonly _usuarios: SeguridadService,
    private readonly _empresas: EmpresasService,
    private readonly _roles: RolesService
  ) {}

  formularioRegistro: FormGroup = new FormGroup({});

  // ============================================================ Función principal
  ngOnInit(): void {
    this.listaEmpresas();
    this.listaRoles();
    this.formularioRegistro = new FormGroup({
      rucEmpresa: new FormControl('', [Validators.required]),
      idUsuario: new FormControl('', [Validators.required]),
      rucempresa: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
      apellidoUsuario: new FormControl('',[Validators.required]),
      cargoUsuario: new FormControl('',[Validators.required]),
      contraseniaUsuario: new FormControl('',[Validators.required]),
      rolUsuario: new FormControl('',[Validators.required]),
    });
  }

  usuario: SeguridadModel = new SeguridadModel();
  guardarUsuario() {
    const formValue = this.usuario;

    formValue.usuariocreador = "Usuario_front"
    formValue.usuariomodificador = "Usuario_front"
    formValue.estado = "1"
    const rucempresa = formValue.rucempresa
    console.log(formValue, rucempresa);

    this._usuarios.newUsuario(formValue).subscribe({
      next: (response) => {
        console.log(response);
        this.mensajeValidacionRegistroCorrecto(this.tituloSwalCorrecto);
      },
      error: (err) => {
        this.mensajeRegistroEmpresa('Error al registrar al usuario', err);
      },
    });
  }

  listaEmpresas() {
    this.empresasSubscription = this._empresas
      .ListarEmpresas()
      .subscribe((response: EmpresasModel[]) => {
        this.DatosEmpresas = response;
      });
  }

   listaRoles() {
      this.rolesSubscription = this._roles
        .ListarRoles()
        .subscribe((response: RolesModel[]) => {
          this.DatosRoles = response;
        });
    }

  tituloSwalCorrecto: string = 'CONFIRMACIÓN';
  mensajeValidacionRegistroCorrecto(response: any) {
    const message = response.message
      ? response.message
      : 'Usuario registrada correctamente';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      window.location.reload();
    });
  }

  mensajeRegistroEmpresa(mensaje: string, error: any): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${mensaje} ${error}`,
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  ngOnDestroy(): void {
    if (this.empresasSubscription) {
      this.empresasSubscription.unsubscribe();
    }
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }

  }
}
