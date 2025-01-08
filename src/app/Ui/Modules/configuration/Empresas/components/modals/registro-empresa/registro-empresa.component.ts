import { Component } from '@angular/core';
import { IconsSvgDocumentacion } from '../../../../../../Shared/Components/icons/svg/icons-svg/icons-svg.component';
import { EmpresasModel } from '../../../../../../../Domain/models/empresas/empresas.model';
import { EmpresasService } from '../../../../../../../Infraestructure/driven-adapter/empresas/empresas.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'registro-empresa',
  standalone: true,
  imports: [
    IconsSvgDocumentacion,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registro-empresa.component.html',
  styleUrl: './registro-empresa.component.css'
})
export class RegistroEmpresaComponent {

  DatosEmpresas: Array<EmpresasModel> = [];

  constructor(
    private _empresas: EmpresasService,
  ) {}

  formularioRegistro: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      rucEmpresa:  new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      razonSocial:  new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      telefonoEmpresa:  new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      direccionEmpresa: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }



  mensajeRegistroEmpresa(mensaje: string, error: any): void {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${mensaje} ${error}`,
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }



  Empresa: EmpresasModel = new EmpresasModel()
  guardarEmpresa() {
    const formValue = this.Empresa
    formValue.usuariocreacion = "Usuario_front"
    formValue.usuariomodificacion = "Usuario_front"
    formValue.estado = "1"
    this._empresas
    .newEmpresa(formValue)
    .subscribe({
      next: (response)=> {
        console.log(response)
        this.mensajeValidacionRegistroCorrecto(this.tituloSwalCorrecto)
      },
      error: (err) => {
        this.mensajeRegistroEmpresa('Error al registrar la empresa', err)
      }
     }
    )
  }

  tituloSwalCorrecto: string = 'CONFIRMACIÓN';
  mensajeValidacionRegistroCorrecto(response: any) {
    const message = response.message ? response.message : 'Empresa registrada correctamente';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      window.location.reload();
    });
  }

}
