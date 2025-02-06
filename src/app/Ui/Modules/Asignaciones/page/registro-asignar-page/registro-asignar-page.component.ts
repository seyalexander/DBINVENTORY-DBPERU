import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { requestAsignarUsuario } from 'src/app/Domain/models/inventarios/requestAsignarUsuario.model';
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
  @Input() requUser: requestAsignarUsuario = {} as requestAsignarUsuario

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  constructor(
    private readonly updateUsuarioAsignadoUseCase: UpdateUsuarioAsignadoUseCase
  ) {}

  tituloSwalCorrecto: string = 'CONFIRMACIÓN';
  selectedUsuarioId: number | null = null;

  inventario: SeguridadModel = new SeguridadModel();
  formularioRegistro: FormGroup = new FormGroup({});

  // ================================================================================
  // FUNCIÓN ASIGNACIÓN
  // ================================================================================
  onAsignarUsuario() {
    const formValue = this.inventario;
    const usuarioAsignacion = formValue.idusuario;
    this.requUser.usuarioId = usuarioAsignacion
    this.requUser.idCarga = this.idCarga
    this.requUser.rucEmpresa = this.rucEmpresa
    this.updateUsuarioAsignadoUseCase
      .updateUsuarioAsignado(this.requUser)
      .subscribe((response: any) => {
        this.mensajeValidacionRegistroCorrecto(response)
      });
  }

  // ================================================================================
  // SWEET ALERT
  // ================================================================================
  mensajeValidacionRegistroCorrecto(response: any) {
    const message =
      response && response.message
        ? response.message
        : 'Inventario creado correctamente.';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      window.location.reload();
    });
  }

  // ================================================================================
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ================================================================================
  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      usuario: new FormControl(0, [Validators.required]),
    });
  }
}
