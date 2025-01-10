import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { UpdateUsuarioAsignadoUseCase } from 'src/app/Domain/use-case/inventarios/update-usuarioAsignado-useCase';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-asignacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-asignacion.component.html',
  styleUrl: './modal-asignacion.component.css',
})
export class ModalAsignacionComponent {
  @Input() getUsuarios_All: Array<SeguridadModel> = [];
  @Input() rucEmpresa: string = '';
  @Input() idCarga: number = 0;
  @Input() usuarios: any[] = [];

  selectedUsuarioId: number | null = null;

  inventario: SeguridadModel = new SeguridadModel();

  formularioRegistro: FormGroup = new FormGroup({});

  constructor(
    private readonly updateUsuarioAsignadoUseCase: UpdateUsuarioAsignadoUseCase
  ) {}

  onAsignarUsuario() {
    const formValue = this.inventario;
    const usuarioAsignacion = formValue.idusuario;
    console.log(this.rucEmpresa, this.idCarga, usuarioAsignacion);

    // if (this.selectedUsuarioId != null) {

    // }

    this.updateUsuarioAsignadoUseCase
      .updateUsuarioAsignado(this.rucEmpresa, this.idCarga, usuarioAsignacion)
      .subscribe((response: any) => {
        this.mensajeValidacionRegistroCorrecto(response)
      });
  }

  tituloSwalCorrecto: string = 'CONFIRMACIÓN';
  mensajeValidacionRegistroCorrecto(response: any) {
    const message =
      response && response.message
        ? response.message
        : 'Inventario creado correctamente.';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      usuario: new FormControl(0, [Validators.required]),
    });
  }
}
