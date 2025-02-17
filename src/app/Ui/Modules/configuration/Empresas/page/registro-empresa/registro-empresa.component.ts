import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { ConsultarucService } from 'src/app/Infraestructure/driven-adapter-ruc/consultaRuc/consultaruc.service';
import { Subscription } from 'rxjs';
import { ResponseConsultaRuc } from 'src/app/Domain/models/empresas/ResponseConsultaRuc.model';

@Component({
  selector: 'registro-empresa',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './registro-empresa.component.html',
  styleUrl: './registro-empresa.component.css'
})
export class RegistroEmpresaComponent {

  DatosEmpresas: Array<EmpresasModel> = [];
  ConsultaRuc: ResponseConsultaRuc = {} as ResponseConsultaRuc

  private  empresasRuc: Subscription | undefined;

  constructor(
    private readonly _empresas: EmpresasService,
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
    formValue.usuariocreacion = sessionStorage.getItem('user') ?? 'system'
    formValue.usuariomodificacion = sessionStorage.getItem('user') ?? 'system'
    formValue.estado = "1"
    this._empresas
    .newEmpresa(formValue)
    .subscribe({
      next: (response)=> {
        console.log(response);

        this.mensajeValidacionRegistroCorrecto(this.tituloSwalCorrecto)
      },
      error: (err) => {
        this.mensajeRegistroEmpresa('Error al registrar la empresa', err)
      }
     }
    )
  }

  // busquedaPorRuc(ruc: string): void {
  //   this.empresasRuc = this._consultaRuc.ConsultaRuc(ruc).subscribe(
  //     (response: ResponseConsultaRuc) => {
  //       this.ConsultaRuc = response
  //       console.log(this.ConsultaRuc);

  //     }
  //   )
  // }


  onCancel() {
    this.formularioRegistro.reset();
  }

  tituloSwalCorrecto: string = 'CONFIRMACIÓN';
  mensajeValidacionRegistroCorrecto(response: any) {
    const message = response.message ? response.message : 'Empresa registrada correctamente';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    if (this.empresasRuc) {
      this.empresasRuc.unsubscribe();
    }
  }
}
