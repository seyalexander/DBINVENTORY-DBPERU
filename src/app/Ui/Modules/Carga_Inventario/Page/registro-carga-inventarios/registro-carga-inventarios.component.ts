import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  private empresasSubscription: Subscription | undefined;

  excelData: any[] = [];
  DatosEmpresas: Array<EmpresasModel> = [];
  Cabecera: inventariosModel = new inventariosModel();
  formularioRegistro: FormGroup = new FormGroup({});

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
      descripcion: this.Cabecera.descripcion || ''
   });

   this.formularioRegistro.patchValue({
    rucempresa: this.Cabecera.rucempresa || ''
 });
  }

  // ================================================================================
  // GUARDAR CABECERA
  // ================================================================================
  guardarCabecera(): void {
    if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(this.selectedFile);

        reader.onload = () => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const detalleData = jsonData.map((item: any) => ({
                // rucempresa:  this.formularioRegistro.value.rucEmpresa || '',
                // idcarga: item.idcarga || 0,
                // nroitem: item.nroitem || 0,
                almacen: item.almacen || "",
                sucursal: item.sucursal || "",
                zona: item.zona || "",
                pasillo: item.pasillo || "",
                rack: item.rack || "",
                ubicacion: item.ubicacion || "",
                esagrupado: item.esagrupado || "",
                codigogrupo: item.codigogrupo || "",
                Codigoproducto: item.Codigoproducto || "",
                codigobarra: item.codigobarra || "",
                descripcionProducto: item.descripcionProducto || "",
                Unidad: item.Unidad || "",
                stockL: item.stockL !== undefined && item.stockL !== null && !isNaN(parseFloat(item.stockL)) ? parseFloat(item.stockL) : 0.0,
                stockF: item.stockF !== undefined && item.stockF !== null && !isNaN(parseFloat(item.stockF)) ? parseFloat(item.stockF) : 0.0,
                stockresultante: item.stockresultante !== undefined && item.stockresultante !== null && !isNaN(parseFloat(item.stockresultante)) ? parseFloat(item.stockresultante) : 0.0,
            }));

            console.log('Detalle mapeado:', detalleData);

            let nombreUsuario = 'USUARIO PRUEBA';

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
                fechainicio: this.Cabecera.fechainicio || ''
            };

            console.log('Valor de rucempresa:', this.Cabecera.rucempresa);
            console.log('Cabecera con detalle:', cabecera);

            this._postCabecera.newCabecera(cabecera).subscribe({
                next: (response) => {
                    console.log('Cabecera y detalle registrados correctamente:', response);
                    this.mensajeCargaExcelCorrecta(response);
                },
                error: (err) => {
                    console.log('Error en la carga:', err); // Ver el detalle del error
                    this.mensajeCargaExcelError('Error al registrar la cabecera y detalle', err);
                }
            });
        };
    } else {
        this.mensajeCargaExcelError('No se ha seleccionado un archivo para cargar.', '');
    }
}




//   guardarCabecera(): void {
//     if (this.selectedFile) {
//         // Crear un objeto FileReader para leer el archivo Excel
//         const reader = new FileReader();
//         reader.readAsArrayBuffer(this.selectedFile);

//         reader.onload = () => {
//             const data = new Uint8Array(reader.result as ArrayBuffer);
//             const workbook = XLSX.read(data, { type: 'array' });

//             // Obtener la primera hoja del libro
//             const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//             // Convertir la hoja a formato JSON y hacer el cast a detalleCarga[]
//             const jsonData = XLSX.utils.sheet_to_json(worksheet) as detalleCarga[];

//             console.log('Datos del archivo:', jsonData); // Verificar datos cargados

//             // Crear la cabecera (sin rucEmpresa e idCarga si ya no son necesarios)
//             let nombreUsuario = 'USUARIO PRUEBA';
//             const cabecera = {
//                 ...this.Cabecera,  // Copiar la cabecera desde la propiedad Cabecera
//                 usuariocreacion: nombreUsuario,
//                 usuariomodificacion: nombreUsuario,
//                 dependecarga: 2,  // Dependiendo de tu lógica, ajustar aquí
//                 totalregistros: jsonData.length,
//                 estado: '1',
//                 usuarioAsignado: '', // Asignar lo que corresponda aquí
//                 detalle: jsonData, // Asignar el detalle procesado desde el archivo Excel
//             };

//             console.log('Cabecera con detalle:', cabecera); // Verificar la cabecera con el detalle

//             // Enviar cabecera y detalle al backend
//             this._postCabecera.newCabecera(cabecera).subscribe({
//                 next: (response) => {
//                     console.log('Cabecera y detalle registrados correctamente:', response);
//                     this.mensajeCargaExcelCorrecta(response);
//                 },
//                 error: (err) => {
//                     console.error('Error al registrar la cabecera y detalle:', err);
//                     this.mensajeCargaExcelError('Error al registrar la cabecera y detalle', err);
//                 }
//             });
//         };
//     } else {
//         console.error('No se ha seleccionado un archivo.');
//         this.mensajeCargaExcelError('No se ha seleccionado un archivo para cargar.', '');
//     }
// }



  // guardarCabecera() {
  //   let nombreUsuario = 'USUARIO PRUEBA';
  //   const formValue = this.Cabecera;
  //   formValue.usuariocreacion = nombreUsuario;
  //   formValue.usuariomodificacion = nombreUsuario;
  //   formValue.dependecarga = 2;
  //   formValue.totalregistros = 0;
  //   formValue.estado = '1';
  //   formValue.usuarioAsignado = '';

  //   const objetoCompleto = formValue;

  //   this._postCabecera.newCabecera(objetoCompleto).subscribe(
  //     (response: any) => {
  //       console.log('Cabecera y detalle registrados correctamente:', response);
  //       this.mensajeCargaExcelCorrecta(response.msgerror);
  //     },
  //     (err) => {
  //       console.error('Error al registrar la cabecera y detalle:', err);
  //       this.mensajeCargaExcelError(
  //         'Error al registrar la cabecera y detalle',
  //         err
  //       );
  //     }
  //   );
  // }

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
              unidad: row[11] || '',
              stockL: row[12] || 0,
              stockF: row[13] || 0,
              stockResultante: row[14] || 0,
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
  // uploadFile(rucEmpresa: string, idCarga: number): void {
  //   if (this.selectedFile) {
  //     this.cargaExcelsService
  //       .uploadExcel(this.selectedFile, rucEmpresa, idCarga)
  //       .subscribe({
  //         next: (response) => {
  //           this.mensajeCargaExcelCorrecta(response);
  //         },
  //         error: (err) => {
  //           this.mensajeCargaExcelError('Error al cargar el archivo', err);
  //           console.error(err);
  //           if (err.error) {
  //             this.mensajeCargaExcelError('Detalles del error', err.error);
  //             console.log(err.error);
  //           } else {
  //             this.mensajeCargaExcelError(
  //               'Detalles del error desconocido',
  //               err
  //             );
  //           }
  //         },
  //       });
  //   }
  // }

  // Cargar el archivo y procesarlo
  uploadFile(rucEmpresa: string, idCarga: number): void {
    if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(this.selectedFile);

        reader.onload = () => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet) as detalleCarga[];

            console.log('Datos del archivo:', jsonData); // Verificar datos cargados

            // Guardar el detalle en `this.detalle`
            this.detalle = jsonData.map((item) => ({
              almacen: item.almacen || "",
              sucursal: item.sucursal || "",
              zona: item.zona || "",
              pasillo: item.pasillo || "",
              rack: item.rack || "",
              ubicacion: item.ubicacion || "",
              esagrupado: item.esagrupado || "",
              codigogrupo: item.codigogrupo || "",
              Codigoproducto: item.Codigoproducto || "",
              codigobarra: item.codigobarra || "",
              descripcionProducto: item.descripcionProducto || "",
              Unidad: item.Unidad || "",
              stockL: item.stockL || 0,
              stockF: item.stockF || 0,
              stockresultante: item.stockresultante,
            }));

            console.log('Detalle cargado en this.detalle:', this.detalle);
        };
    }
}


  // uploadFile(rucEmpresa: string, idCarga: number): void {
  //   if (this.selectedFile) {
  //     // Crear un objeto FileReader para leer el archivo Excel
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(this.selectedFile);

  //     reader.onload = (e) => {
  //       const data = new Uint8Array(reader.result as ArrayBuffer);
  //       const workbook = XLSX.read(data, { type: 'array' });

  //       // Obtener la primera hoja del libro
  //       const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  //       // Convertir la hoja a formato JSON y hacer el cast a detalleCarga[]
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet) as detalleCarga[];

  //       // Mostrar los datos del archivo en la consola para depuración
  //       console.log('Datos del archivo:', jsonData);

  //       // Obtener la cabecera desde la propiedad Cabecera
  //       const cabecera = this.Cabecera; // Ya tienes la cabecera aquí

  //       // Asignar el detalle (datos del archivo Excel) al modelo de cabecera
  //       cabecera.detalle = jsonData.map((item) => {
  //         const detalle = new detalleCarga();
  //         detalle.Codigobarra = item.Codigobarra;
  //         detalle.Codigoproducto = item.Codigoproducto;
  //         detalle.Unidad = item.Unidad;
  //         detalle.almacen = item.almacen;
  //         detalle.codigobarra = item.codigobarra;
  //         detalle.codigogrupo = item.codigogrupo;
  //         detalle.descripcionProducto = item.descripcionProducto;
  //         detalle.esagrupado = item.esagrupado;
  //         detalle.id = item.id;
  //         detalle.nroitem = item.nroitem;
  //         detalle.pasillo = item.pasillo;
  //         detalle.rack = item.rack;
  //         detalle.stockF = item.stockF;
  //         detalle.stockL = item.stockL;
  //         detalle.stockresultante = item.stockresultante;
  //         detalle.sucursal = item.sucursal;
  //         detalle.ubicacion = item.ubicacion;
  //         detalle.unidad = item.unidad;
  //         detalle.zona = item.zona;
  //         return detalle;
  //       });

  //       // Enviar la cabecera con el detalle al backend
  //       this._postCabecera.newCabecera(cabecera).subscribe({
  //         next: (response) => {
  //           this.mensajeCargaExcelCorrecta(response);
  //         },
  //         error: (err) => {
  //           this.mensajeCargaExcelError('Error al cargar el archivo', err);
  //           console.error(err);
  //           if (err.error) {
  //             this.mensajeCargaExcelError('Detalles del error', err.error);
  //           } else {
  //             this.mensajeCargaExcelError(
  //               'Detalles del error desconocido',
  //               err
  //             );
  //           }
  //         },
  //       });
  //     };
  //   }
  // }

  // ================================================================================
  // MENSAJE CORRECTO DE CARGA - SWEET ALERT
  // ================================================================================
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
      stockResultante: row[14] || 0
    };
  }

  // ================================================================================
  // LIMPIAR DATOS PREVIEW
  // ================================================================================
  limpiarDatosPreview(): void {
    this.excelData = [];
    this.cantidadDatosExcel = 0;
    this.selectedFileName = '';
    this.HayArchivo = false;
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
  stockResultante: number;
}
