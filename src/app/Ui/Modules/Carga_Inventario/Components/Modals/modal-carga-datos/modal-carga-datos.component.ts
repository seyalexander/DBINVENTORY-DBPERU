import { CargaDatosService } from '../../../../../../Infraestructure/driven-adapter/carga_datos/carga-datos.service';
import Swal from 'sweetalert2';
import { EmpresasService } from '../../../../../../Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from '../../../../../../Domain/models/empresas/empresas.model';
import { Subscription } from 'rxjs';
import { inventariosModel } from '../../../../../../Domain/models/inventarios/inventarios.models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventariosService } from '../../../../../../Infraestructure/driven-adapter/inventarios/inventarios.service';
import * as XLSX from 'xlsx';
import { Component } from '@angular/core';
import { ModalDetallePreviewComponent } from '../modal-detalle-preview/modal-detalle-preview.component';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-carga-datos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalDetallePreviewComponent
  ],
  templateUrl: './modal-carga-datos.component.html',
  styleUrl: './modal-carga-datos.component.css',
})
export class ModalCargaDatosComponent {

  // ============================================================ Declaración variables
  mensajeCompleto: string = 'Error al cargar el archivo';
  selectedFileName: string = '';
  selectedFile: File | null = null;
  fileDetails: any = null;
  ultimoIdCargaRegistrado: any;
  excelData: any[] = [];
  DatosEmpresas: Array<EmpresasModel> = [];
  cantidadDatosExcel: number = 0
  HayArchivo: boolean = false

  // ============================================================ Injección servicios
  private empresasSubscription: Subscription | undefined;

  constructor(
    private readonly cargaExcelsService: CargaDatosService,
    private readonly _empresas: EmpresasService,
    private readonly _postCabecera: InventariosService,
    private readonly router: Router
  ) {}

  formularioRegistro: FormGroup = new FormGroup({});

  // ============================================================ Función principal
  ngOnInit(): void {
    this.listaEmpresas();
    this.validandoArchivoPreview()

    this.formularioRegistro = new FormGroup({
      rucempresa: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  // ============================================================ Validación archivo preview
  validandoArchivoPreview(){
    if(this.selectedFileName != null && this.selectedFileName.trim() !== ''){
      this.HayArchivo = true
    }else {
      this.HayArchivo = false
    }
  }

  // ============================================================ Selección de archivos

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedExtensions = ['xlsx', 'xls'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        Swal.fire({
          icon: 'error',
          title: 'Archivo no permitido',
          text: 'Por favor, seleccione un archivo Excel (.xlsx o .xls).',
        });
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = this.selectedFile.name;
      this.fileDetails = {
        name: this.selectedFile.name,
        size: this.selectedFile.size,
        type: this.selectedFile.type,
        lastModified: this.selectedFile.lastModified,
      };

      this.HayArchivo = true;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawExcelData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        this.excelData = rawExcelData.slice(1).map((row: any[]) => ({
          almacen: row[0],
          sucursal: row[1],
          zona: row[2],
          pasillo: row[3],
          rack: row[4],
          ubicacion: row[5],
          esagrupado: row[6],
          codigogrupo: row[7],
          codigoproducto: row[8],
          codigobarra: row[9],
          descripcionproducto: row[10],
          unidad: row[11],
          stockL: row[12],
          stockF: row[13],
        }));

        this.cantidadDatosExcel = this.excelData.length;
      };
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }


  uploadFile(rucEmpresa: string, idCarga: number): void {
    if (this.selectedFile) {
      this.cargaExcelsService
        .uploadExcel(this.selectedFile, rucEmpresa, idCarga)
        .subscribe({
          next: (response) => {
            this.mensajeCargaExcelCorrecta(response);
          },
          error: (err) => {
            this.mensajeCargaExcelError('Error al cargar el archivo', err);
            console.error(err);
            if (err.error) {
              this.mensajeCargaExcelError('Detalles del error', err.error);
              console.log(err.error);
            } else {
              this.mensajeCargaExcelError(
                'Detalles del error desconocido',
                err
              );
            }
          },
        });
    }
  }

  mensajeCargaExcelCorrecta(mensaje: any): void {
    this.mensajeCompleto = mensaje.count + ' ' + mensaje.message;

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: this.mensajeCompleto,
      showConfirmButton: true,
      // timer: 1500
    }).then(() => {
      window.location.reload();
    });
  }

  mensajeCargaExcelError(mensaje: string, error: any): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${mensaje} ${error}`,
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  listaEmpresas() {
    this.empresasSubscription = this._empresas
      .ListarEmpresas()
      .subscribe((response: EmpresasModel[]) => {
        this.DatosEmpresas = response;
      });
  }

  Cabecera: inventariosModel = new inventariosModel();
  guardarCabecera() {
    const formValue = this.Cabecera;
    formValue.usuariocreacion = 'Usuario_front';
    formValue.usuariomodificacion = 'Usuario_front';
    formValue.dependecarga = 2;
    formValue.totalregistros = 10;
    formValue.estado = '1';
    formValue.usuarioAsignado = ''
    const rucempresa = formValue.rucempresa;
    this._postCabecera.newCabecera(formValue).subscribe((response: any) => {
      this._postCabecera
        .getUltimaCabceraRegistrada(rucempresa)
        .subscribe((response: number) => {
          this.uploadFile(rucempresa, response);
        });
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
      this.router.navigate(['/dashboard/CargarInventario']);
    });
  }

  mapExcelRow(row: any[]): ExcelRow {
    return {
      almacen: row[0] || '',
      sucursal: row[1] || '',
      zona: row[2] || '',
      pasillo: row[3] || '',
      rack: row[4] || '',
      ubicacion: row[5] || '',
      esagrupado: row[6] || '',
      codigogrupo: row[7] || '',
      codigoproducto: row[8] || '',
      codigobarra: row[9] || '',
      descripcionproducto: row[10] || '',
      unidad: row[11] || '',
      stockL: row[12] || 0,
      stockF: row[13] || 0,
    };
  }

  limpiarDatosPreview(): void {
    this.excelData = [];
    this.cantidadDatosExcel = 0;
    this.selectedFileName = '';
    this.HayArchivo = false;
  }

  ngOnDestroy(): void {
    if (this.empresasSubscription) {
      this.empresasSubscription.unsubscribe();
    }
  }
}

// ============================================================ Interfaces
interface FileDetails {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface ExcelRow {
  almacen: string;
  sucursal: string;
  zona: string;
  pasillo: string;
  rack: string;
  ubicacion: string;
  esagrupado: string;
  codigogrupo: string;
  codigoproducto: string;
  codigobarra: string;
  descripcionproducto: string;
  unidad: string;
  stockL: number;
  stockF: number;
}
