import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { UpdateUsuarioAsignadoUseCase } from 'src/app/Domain/use-case/inventarios/update-usuarioAsignado-useCase';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro-asignar-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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
    console.log(this.rucEmpresa, this.idCarga, usuarioAsignacion);
    if (this.selectedUsuarioId != null) {
      this.updateUsuarioAsignadoUseCase
      .updateUsuarioAsignado(this.rucEmpresa, this.idCarga, usuarioAsignacion)
      .subscribe((response: any) => {
        this.mensajeValidacionRegistroCorrecto(response)
      });
    }

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
