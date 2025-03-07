import { Component, inject, Input, SimpleChanges } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { DesignPageTablaDatosComponent } from '../design-page/design-page-tabla-datos/design-page-tabla-datos.component';
import { FiltrosCheckboxTablaComponent } from '../../filtros-checkbox-tabla/filtros-checkbox-tabla.component';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { MatTabsModule } from '@angular/material/tabs';
import * as XLSX from 'xlsx';
import { MatIcon } from '@angular/material/icon';
import { RequestObtenerDetalleFiltros } from 'src/app/Domain/models/inventarios/requestObtenerDetalleInventarioByFiltros.mode';
import { InventarioDetallesByFiltrosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalleByFiltros-use-case';
import { RequestObtenerDetalleAjusteFiltros } from 'src/app/Domain/models/inventarios/reqyestObtenerDetalleAjustadosFiltros.model';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import { DesingPageTablaAjustadosComponent } from '../design-page/desing-page-tabla-ajustados/desing-page-tabla-ajustados.component';

@Component({
  selector: 'design-report-inventario',
  standalone: true,
  imports: [
    DesignPageTablaDatosComponent,
    FiltrosCheckboxTablaComponent,
    MatTabsModule,
    MatIcon,
    DesingPageTablaAjustadosComponent
  ],
  templateUrl: './design-report-inventario.component.html',
  styleUrl: './design-report-inventario.component.css',
})
export class DesignReportInventarioComponent {

  selectedOption: string = '';

  showPantalla_data: boolean = false
  cambiarPantalla() {
    this.showPantalla_data = !this.showPantalla_data;
  }

  exportar() {
    if (!this.selectedOption) {
      alert("Seleccione un formato antes de exportar.");
      return;
    }

    if (this.selectedOption === 'excel') {
      this.inventarioSeleccionadoExcel()

    } else if (this.selectedOption === 'pdf') {
      this.inventarioSeleccionado(
        this.citaSeleccionada.rucempresa,
        this.citaSeleccionada.idcarga
      )
    }
  }


  exportarEXCEL() {
    if (this.selectedOption === 'excel') {
      this.inventarioSeleccionadoExcel()
    }
  }

  exportarPDF() {
    if (this.selectedOption === 'pdf') {
      this.inventarioSeleccionado(
        this.citaSeleccionada.rucempresa,
        this.citaSeleccionada.idcarga
      )
    }
  }

  selectOptionEXCEL(option: string) {
    this.selectedOption = option;
    this.exportarEXCEL()
  }

  selectOptionPDF(option: string) {
    this.selectedOption = option;
    this.exportarPDF()
  }
  // ---------------------------------------------------------------------------------------
  // DECORADORES
  // ---------------------------------------------------------------------------------------

  @Input() citaSeleccionada: inventariosModel = {} as inventariosModel;
  @Input() detalleProductos: Array<detalleCarga> = [];
  @Input() rucEmpresa!: string;
  @Input() idCarga!: number;
  @Input() TotalRegistros: number = 0;
  @Input() RegistrosFaltantes: number = 0;
  @Input() RegistrosNoFaltantes: number = 0
  @Input() NuevosRegistros: number = 0;
  @Input() ConteosExactos: number = 0;
  @Input() ItemsAjustados: number = 0;

  private readonly listDetalleByFiltros = inject(InventarioDetallesByFiltrosUseCases);
  private _inventarios = inject(InventariosService)

  listaProductos: Array<detalleCarga> = [];
  titulosOpciones: string = ''
  ObtenerDetalleInventariosPDF(  diferencias: number, esnuevo: number) {
    const rucempresa: string = this.citaSeleccionada.rucempresa
    const idcarga: number = this.citaSeleccionada.idcarga
    const reqDatos: RequestObtenerDetalleFiltros = { rucempresa, idcarga, diferencias, esnuevo };
    this.listDetalleByFiltros
      .getDetalleInventarioByFiltros(reqDatos)
      .subscribe((response: detalleCarga[]) => {
        this.listaProductos = response;

        if (diferencias == 0 && esnuevo == 2) {
          this.titulosOpciones = 'Total de registros';
        } else if (diferencias == 3 && esnuevo == 0) {
          this.titulosOpciones = 'Registros con faltantes';
        } else if (diferencias == 2 && esnuevo == 0) {
          this.titulosOpciones = 'Registros sin faltantes';
        } else if (diferencias == 0 && esnuevo == 1) {
          this.titulosOpciones = 'Nuevos registros';
        } else if (diferencias == 1 && esnuevo == 2) {
          this.titulosOpciones = 'Conteos exactos';
        } else {
          this.titulosOpciones = 'Sin datos';
        }

      });
  }


  ObtenerDetalleInventariosAjustados() {
    const req: RequestObtenerDetalleAjusteFiltros = {
          rucempresa:this.citaSeleccionada.rucempresa,
          idcarga: this.citaSeleccionada.idcarga,
          ajustes: 2
        }
        this._inventarios.getInventariosAjustesByFiltros(req)
        .subscribe((Response: detalleCarga[]) => {
          this.listaProductos = Response;
          this.titulosOpciones = 'Productos ajustados';
        });
  }

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  datosInventario: inventariosModel = {} as inventariosModel;
  InventarioSeleccionado: inventariosModel = {} as inventariosModel;
  DetalleInventarioSeleccionado: Array<detalleCarga> = [];
  datosInventarioslista: Array<inventariosModel> = [];

  columnasSeleccionadas: string[] = [];

  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly DetalleInventario = inject(InventarioDetallesUseCases);

  // ---------------------------------------------------------------------------------------
  // COLUMNAS SELECCIONADAS
  // ---------------------------------------------------------------------------------------

  recibirColumnasSeleccionadas(columnas: string[]): void {
    this.columnasSeleccionadas = columnas;
  }

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN PRINCIPAL
  // ---------------------------------------------------------------------------------------
  ngOnInit(): void {
    if (this.columnasSeleccionadas.length === 0) {
      this.columnasSeleccionadas = [
        'codigoproducto',
        'codigobarra',
        'descripcionProducto',
        'unidad',
        'stockL',
        'stockF',
        'stockresultante',
        'ajuste',
        'almacen',
        'sucursal',
        'zona',
        'pasillo',
        'rack',
        'ubicacion',
        'esagrupado',
        'codigogrupo',

      ];
    }

    this.recibirColumnasSeleccionadas(this.columnasSeleccionadas);
  }



  inventarioSeleccionadoDisenio(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    const reqDetalle: RequestObtenerDetalle = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
        reqDetalle.idcarga = response.idcarga
        reqDetalle.rucempresa = response.rucempresa
        this.DetalleInventario.getDetalleInventario(reqDetalle).subscribe(
          (response: detalleCarga[]) => {
            this.DetalleInventarioSeleccionado = response
            this.exportPDFPortada();
          }
        )

      }
    );
  }

  inventarioSeleccionado(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
        this.exportToPDF();
      }
    );
  }


  exportToPDF() {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte de INVENTARIO', 105, 15);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 25);

    let finalY = 35;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Inventarios', 14, finalY);
    finalY += 6;

    // Filtrar columnas de acuerdo con las seleccionadas
    const columnasSeleccionadas = this.columnasSeleccionadas;

    // Definir las columnas que se mostrarán
    const employeeColumns = [
      { title: 'almacen', dataKey: 'almacen' },
      { title: 'sucursal', dataKey: 'sucursal' },
      { title: 'zona', dataKey: 'zona' },
      { title: 'pasillo', dataKey: 'pasillo' },
      { title: 'rack', dataKey: 'rack' },
      { title: 'ubicacion', dataKey: 'ubicacion' },
      { title: 'esagrupado', dataKey: 'esagrupado' },
      { title: 'codigogrupo', dataKey: 'codigogrupo' },
      { title: 'codigoproducto', dataKey: 'codigoproducto' },
      { title: 'codigobarra', dataKey: 'codigobarra' },
      { title: 'descripcionProducto', dataKey: 'descripcionProducto' },
      { title: 'unidad', dataKey: 'unidad' },
      { title: 'stockL', dataKey: 'stockL' },
      { title: 'stockF', dataKey: 'stockF' },
      { title: 'stockresultante', dataKey: 'stockresultante' },
    ];

    const filteredColumns = employeeColumns.filter((col) =>
      columnasSeleccionadas.includes(col.dataKey)
    );

    if (!this.listaProductos || !Array.isArray(this.listaProductos)) {
      console.error('Error: Detalle producto o su detalle es undefined o no es un array');
      return;
    }

    const employeeBody = this.listaProductos.map((det) => {
      return filteredColumns.map((col) => {
        return det[col.dataKey];
      });
    });

    (doc as any).autoTable({
      head: [filteredColumns.map((col) => col.title)],
      body: employeeBody,
      startY: finalY,
      styles: {
        font: 'helvetica',
        fontSize: 8,
        cellPadding: 1,
        textColor: [34, 34, 34],
        fillColor: [255, 255, 255],
        lineColor: [44, 62, 80],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center',
      },
    });

    doc.save(`${this.InventarioSeleccionado.descripcion}.pdf`);
  }

  // ---------------------------------------------------------------------------------------
  // EXPORTAR PDF CON PORTADA Y FOOTER
  // ---------------------------------------------------------------------------------------
  exportPDFPortada(): void {
    const content = document.getElementById('container-portada');
    const content1 = document.getElementById('container-final');
    const doc = new jsPDF('landscape');

    if (content && content1) {
      html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);

        doc.addPage();

        this.generatePDFDetail(doc).then(() => {
          doc.addPage();

          html2canvas(content1).then((canvas1) => {
            const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
            doc.addImage(imgData1, 'JPEG', 0, 0, 297, 210);
            doc.save(`${this.InventarioSeleccionado.descripcion}.pdf`);
          });
        });
      });
    }
  }

  generatePDFDetail(doc: jsPDF): Promise<void> {
    return new Promise((resolve) => {
      const pageWidth = 297;
      const pageHeight = 210;

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Reporte de INVENTARIO', pageWidth / 2, 15, { align: 'center' });

      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 25);

      let finalY = 35;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Inventarios', 14, finalY);
      finalY += 6;

      const employeeColumns = [
        'almacen',
        'sucursal',
        'zona',
        'pasillo',
        'rack',
        'ubicacion',
        'esagrupado',
        'codigogrupo',
        'codigoproducto',
        'codigobarra',
        'descripcionProducto',
        'Unidad',
        'stockL',
        'stockfisico',
        'stockresultante',
      ];

      const employeeBody = this.listaProductos.map((det) => [
        det.almacen,
        det.sucursal,
        det.zona,
        det.pasillo,
        det.rack,
        det.ubicacion,
        det.esagrupado,
        det.codigogrupo,
        det.codigoproducto,
        det.Codigobarra,
        det.descripcionProducto,
        det.Unidad,
        det.stockL,
        det.stockF,
        det.stockresultante
      ]);

      (doc as any).autoTable({
        head: [employeeColumns],
        body: employeeBody,
        startY: finalY,
        styles: {
          font: 'helvetica',
          fontSize: 8,
          cellPadding: 1,
          textColor: [34, 34, 34],
          fillColor: [255, 255, 255],
          lineColor: [44, 62, 80],
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold',
          halign: 'center',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 30 },
          2: { cellWidth: 20 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 30 },
          6: { cellWidth: 20 },
          7: { cellWidth: 'auto' },
          8: { cellWidth: 'auto' },
          9: { cellWidth: 'auto' },
          10: { cellWidth: 40 },
          11: { cellWidth: 30 },
        },
        tableWidth: pageWidth - 20,
        margin: { left: 10, right: 10, top: finalY, bottom: 10 },
      });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Reporte generado por el sistema DB INVENTORY - Contacto: Data Business S.A.C.',
        14,
        pageHeight - 10
      );

      resolve();
    });
  }



  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  detalleInventario: Array<detalleCarga> = []

  private readonly ObjectInventarioExcel = inject(InventariosByIdUseCases);
  private readonly ObjetDetalleInventario = inject(InventarioDetallesUseCases);

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN PARA OBTENER INVENTARIO Y EXPORTAR A EXCEL
  // ---------------------------------------------------------------------------------------
  inventarioSeleccionadoExcel() {
    const rucempresa: string = this.citaSeleccionada.rucempresa
    const idcarga: number = this.citaSeleccionada.idcarga
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    const reqDatosDetalle: RequestObtenerDetalle = { rucempresa, idcarga };

    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;

        this.ObjetDetalleInventario.getDetalleInventario(reqDatosDetalle).subscribe(
          (response: detalleCarga[]) => {
            this.detalleInventario = response;
            this.exportToExcel();
          }
        )
      }
    );
  }


  // ---------------------------------------------------------------------------------------
  // FUNCIÓN EXPORTAR A EXCEL
  // ---------------------------------------------------------------------------------------
  private exportToExcel() {
    // Filtrar las columnas de acuerdo con las seleccionadas
    const columnasSeleccionadas = this.columnasSeleccionadas;

    // Filtrar los datos antes de exportar
    const dataFiltrada = this.listaProductos.map((det) => {
      const fila: any = {};
      columnasSeleccionadas.forEach((columna) => {
        fila[columna] = det[columna];
      });
      return fila;
    });

    // Convertir los datos filtrados a hoja de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataFiltrada);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');

    const nombreArchivo = `${this.InventarioSeleccionado.descripcion}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
  }

}
