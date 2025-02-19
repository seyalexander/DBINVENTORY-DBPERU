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
import { ConsultarucService } from 'src/app/Infraestructure/driven-adapter-ruc/consultaRuc/consultaruc.service';
import { Subscription } from 'rxjs';
import { ResponseConsultaRuc } from 'src/app/Domain/models/empresas/ResponseConsultaRuc.model';
import { RequestConsultaRuc } from 'src/app/Domain/models/empresas/RequestConsultaRuc.model';

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

  RazonSocial: string = ''
  Direccion: String = ''
  DatosEmpresas: Array<EmpresasModel> = [];
  ConsultaRuc: ResponseConsultaRuc = {} as ResponseConsultaRuc

  private  empresasRuc: Subscription | undefined;
  private  consultaRuc: Subscription | undefined;

  constructor(
    private readonly _empresas: EmpresasService,
    private readonly _consultaRuc: ConsultarucService
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

  validarRuc() {
    console.log('RUC ingresado:', this.formularioRegistro.get('rucEmpresa')?.value);
  }



  busquedaPorRuc(): void {
    const ruc = this.formularioRegistro.get('rucEmpresa')?.value;

    if (!ruc || ruc.length !== 11) {
      console.warn('RUC inválido:', ruc);
      return;
    }

    console.log('Buscando información para RUC:', ruc);
    const requestPayload: RequestConsultaRuc = { nroDocumento: ruc };

    this.empresasRuc = this._consultaRuc.consultaRuc(requestPayload).subscribe(
      (response: ResponseConsultaRuc) => {
        this.ConsultaRuc = response;
        this.RazonSocial = response.result.RazonSocial
        this.Direccion = response.result.Direccion
        const razonSocial = response.result?.RazonSocial || '';
        const direccionEmpresa = response.result?.Direccion || '';

        this.formularioRegistro.patchValue({ razonSocial });
        this.formularioRegistro.patchValue({ direccionEmpresa });

      },
      (error) => {
        console.error('Error en la consulta del RUC:', error);
      }
    );
  }




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
    this.empresasRuc?.unsubscribe();
    this.consultaRuc?.unsubscribe()
  }
}
