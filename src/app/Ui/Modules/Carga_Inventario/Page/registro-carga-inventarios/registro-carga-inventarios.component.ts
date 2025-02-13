import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { CargaDatosService } from 'src/app/Infraestructure/driven-adapter/carga_datos/carga-datos.service';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { PreviewCargaInventariosComponent } from '../preview-carga-inventarios/preview-carga-inventarios.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'registro-carga-inventarios',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PreviewCargaInventariosComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './registro-carga-inventarios.component.html',
  styleUrl: './registro-carga-inventarios.component.css',
})
export class RegistroCargaInventariosComponent {
  // ================================================================================
  // DECLARACION VARIABLES
  // ================================================================================
  mensajeCompleto: string = 'Error al cargar el archivo';
  tituloSwalCorrecto: string = 'CONFIRMACIÓN';
  selectedFileName: string = '';
  selectedFile: File | null = null;
  fileDetails: any = null;
  ultimoIdCargaRegistrado: any;
  cantidadDatosExcel: number = 0;
  detalle: detalleCarga[] = [];
  HayArchivo: boolean = false;
  usuarioLogueado: string = ''
  private empresasSubscription: Subscription | undefined;

  excelData: any[] = [];
  DatosEmpresas: Array<EmpresasModel> = [];
  Cabecera: inventariosModel = new inventariosModel();
  formularioRegistro: FormGroup = new FormGroup({});
  @ViewChild('fileInput') fileInput: any;


  activarGuardar: boolean = false
  activarButton: boolean = false

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  constructor(
    private readonly cargaExcelsService: CargaDatosService,
    private readonly _empresas: EmpresasService,
    private readonly _postCabecera: InventariosService,
    private readonly router: Router
  ) {}

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {


    this.listaEmpresas();
    this.validandoArchivoPreview();

    this.formularioRegistro = new FormGroup({
      rucempresa: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.formularioRegistro.patchValue({
      descripcion: this.Cabecera.descripcion || '',
    });

    this.formularioRegistro.patchValue({
      rucempresa: this.Cabecera.rucempresa || '',
    });

  }

  // ================================================================================
  // GUARDAR CABECERA
  // ================================================================================
  guardarCabecera(): void {
    const idUsuario = sessionStorage.getItem('user');
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.selectedFile);

      reader.onload = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const detalleData = jsonData.map((item: any) => ({
          almacen: item.almacen || '',
          sucursal: item.sucursal || '',
          zona: item.zona || '',
          pasillo: item.pasillo || '',
          rack: item.rack || '',
          ubicacion: item.ubicacion || '',
          esagrupado: item.esagrupado || '',
          codigogrupo: item.codigogrupo || '',
          Codigoproducto: item.Codigoproducto || '',
          Codigobarra: item.Codigobarra || '',
          descripcionProducto: item.descripcionProducto || '',
          Unidad: item.Unidad || '',
          stockL:
            item.stockL !== undefined &&
            item.stockL !== null &&
            !isNaN(parseFloat(item.stockL))
              ? parseFloat(item.stockL)
              : 0.0,
          stockF:
            item.stockF !== undefined &&
            item.stockF !== null &&
            !isNaN(parseFloat(item.stockF))
              ? parseFloat(item.stockF)
              : 0.0,
          stockresultante:
            item.stockresultante !== undefined &&
            item.stockresultante !== null &&
            !isNaN(parseFloat(item.stockresultante))
              ? parseFloat(item.stockresultante)
              : 0.0,
        }));



        const nombreUsuario = idUsuario ?? 'Registro sistema';

        const cabecera = {
          ...this.Cabecera,
          usuariocreacion: nombreUsuario,
          usuariomodificacion: nombreUsuario,
          dependecarga: 0,
          totalregistros: detalleData.length,
          estado: '1',
          usuarioAsignado: '',
          descripcion: this.formularioRegistro.value.descripcion,
          detalle: detalleData,
          fechainicio: this.Cabecera.fechainicio || '',
        };

        cabecera.Descripcion = cabecera.Descripcion.toUpperCase()

        this._postCabecera.newCabecera(cabecera).subscribe({
          next: (response) => {
            this.mensajeCargaExcelCorrecta(response);
          },
          error: (err) => {
            this.mensajeCargaExcelError(
              'Error al registrar la cabecera y detalle',
              err
            );
          },
        });
      };
    } else {
      // this.mensajeCargaExcelError(
      //   'No se ha seleccionado un archivo para cargar.',
      //   ''
      // );
    }
  }

  // ================================================================================
  // VALIDACIÓN PREVIEW
  // ================================================================================
  validandoArchivoPreview() {
    if (this.selectedFileName != null && this.selectedFileName.trim() !== '') {
      this.HayArchivo = true;
    } else {
      this.HayArchivo = false;
    }
  }

  // ================================================================================
  // SELECIÓN ARCHIVOS
  // ================================================================================
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
        const rawExcelData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        this.excelData = rawExcelData
          .slice(1)
          .map((row: any[]) => {
            const mappedRow = {
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
              Unidad: row[11] || '',
              stockL: row[12] || 0,
              stockF: row[13] || 0,
              stockresultante: row[14] || 0,
            };

            return Object.values(mappedRow).every((value) => !value)
              ? null
              : mappedRow;
          })
          .filter((row) => row !== null);

        this.cantidadDatosExcel = this.excelData.length;
      };
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }

  // ================================================================================
  // CARGA ARCHIVO
  // ================================================================================
  uploadFile(rucEmpresa: string, idCarga: number): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.selectedFile);

      reader.onload = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as detalleCarga[];

        // Guardar el detalle en `this.detalle`
        this.detalle = jsonData.map((item) => ({
          almacen: item.almacen || '',
          sucursal: item.sucursal || '',
          zona: item.zona || '',
          pasillo: item.pasillo || '',
          rack: item.rack || '',
          ubicacion: item.ubicacion || '',
          esagrupado: item.esagrupado || '',
          codigogrupo: item.codigogrupo || '',
          Codigoproducto: item.Codigoproducto || '',
          Codigobarra: item.Codigobarra || '',
          descripcionProducto: item.descripcionProducto || '',
          Unidad: item.Unidad || '',
          stockL: item.stockL || 0,
          stockF: item.stockF || 0,
          stockresultante: item.stockresultante || 0,
        }));
      };
    }
  }

  // ================================================================================
  // MENSAJE CORRECTO DE CARGA - SWEET ALERT
  // ================================================================================
  mensajeCargaExcelCorrecta(mensaje: any): void {
    this.mensajeCompleto = mensaje.count + ' ' + mensaje.message;

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'REGISTRO CORRECTO',
      showConfirmButton: true,
      // timer: 1500
    }).then(() => {
      window.location.reload();
    });
  }

  // ================================================================================
  // MENSAJE ERROR CARGA - SWEET ALERT
  // ================================================================================
  mensajeCargaExcelError(mensaje: string, error: any): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${mensaje} ${error}`,
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  // ================================================================================
  // LISTA EMPRESAS
  // ================================================================================
  listaEmpresas() {
    this.empresasSubscription = this._empresas
      .ListarEmpresas()
      .subscribe((response: MensajeResponseEmpresas) => {
        this.DatosEmpresas = response.empresas;
      });
  }

  // ================================================================================
  // MENSAJE REGISTRO CORRECTO - SWEET ALERT
  // ================================================================================
  mensajeValidacionRegistroCorrecto(response: any) {
    const message =
      response && response.msgerror
        ? response.msgerror
        : 'Inventario creado correctamente.';
    Swal.fire(`${this.tituloSwalCorrecto}`, message, 'success').then(() => {
      window.location.reload();
    });
  }

  // ================================================================================
  // MAPEO DE CELDAS
  // ================================================================================
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
      stockresultante: row[14] || 0,
    };
  }

  // ================================================================================
  // LIMPIAR DATOS PREVIEW
  // ================================================================================
  limpiarDatosPreview(): void {
    this.formularioRegistro.reset();
    this.fileInput.nativeElement.value = ''
    this.selectedFileName = ''
    this.HayArchivo = false
    this.cantidadDatosExcel = 0
  }

  // ================================================================================
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ================================================================================
  ngOnDestroy(): void {
    if (this.empresasSubscription) {
      this.empresasSubscription.unsubscribe();
    }
  }
}

// ================================================================================
// TIPADO DETALLES
// ================================================================================
interface FileDetails {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

// ================================================================================
// TIPADO CELDAS
// ================================================================================
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
  stockresultante: number;
}
