import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RequestAsignarUsuario } from 'src/app/Domain/models/inventarios/requestAsignarUsuario.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { UpdateUsuarioAsignadoUseCase } from 'src/app/Domain/use-case/inventarios/update-usuarioAsignado-useCase';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro-asignar-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './registro-asignar-page.component.html',
  styleUrl: './registro-asignar-page.component.css'
})
export class RegistroAsignarPageComponent {

  // ================================================================================
  // DECORADORES
  // ================================================================================
  @Input() getUsuarios_All: Array<SeguridadModel> = [];
  @Input() rucEmpresa: string = '';
  @Input() idCarga: number = 0;
  @Input() usuarios: any[] = [];
  @Input() requUser: RequestAsignarUsuario = {} as RequestAsignarUsuario

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================

  private readonly updateUsuarioAsignadoUseCase = inject(UpdateUsuarioAsignadoUseCase)

  selectedUsuarioId: number | null = null;
  currentDate: string = new Date().toLocaleDateString();

  inventario: SeguridadModel = new SeguridadModel();
  usuarioAsignado: RequestAsignarUsuario = new RequestAsignarUsuario()
  formularioRegistro: FormGroup = new FormGroup({});

  // ================================================================================
  // FUNCIÓN ASIGNACIÓN
  // ================================================================================
  onAsignarUsuario() {

    const formAsignacion = this.requUser

    formAsignacion.idcarga =  this.idCarga
    formAsignacion.rucempresa = this.rucEmpresa.toString()
    formAsignacion.usuarioasignado = this.inventario.idusuario.toString()

    this.updateUsuarioAsignadoUseCase
      .updateUsuarioAsignado(formAsignacion)
      .subscribe((response: any) => {
        console.log(formAsignacion);


        if(response.exito) {
          this.mensajeValidacionRegistroCorrecto(response)
        }

        if(!response.exito){
          this.mensajeValidacionRegistroIncorrecto(response.msgerror)
        }
      });
  }

  // ================================================================================
  // SWEET ALERT
  // ================================================================================
  mensajeValidacionRegistroCorrecto(response: any) {
    const message =
      response
        ? response.message
        : 'Inventario creado correctamente.';
    Swal.fire('CONFIRMACIÓN', message, 'success').then(() => {
      window.location.reload();
    });
  }

  mensajeValidacionRegistroIncorrecto(response: any) {
    const message =
      response
        ? response.msgerror
        : 'Error al asignar';
    Swal.fire(response, message, 'error').then(() => {
      window.location.reload();
    });
  }

  // ================================================================================
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ================================================================================
  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
    });


  }
}
