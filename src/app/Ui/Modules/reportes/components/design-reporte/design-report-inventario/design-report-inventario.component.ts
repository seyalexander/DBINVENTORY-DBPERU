import { Component, inject, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import * as html2pdf from 'html2pdf.js';
import { DesignPagePortadaComponent } from '../design-page/design-page-portada/design-page-portada.component';
import { DesignPageFinalComponent } from '../design-page/design-page-final/design-page-final.component';
import { DesignPageTablaDatosComponent } from '../design-page/design-page-tabla-datos/design-page-tabla-datos.component';
import { FiltrosCheckboxTablaComponent } from '../../filtros-checkbox-tabla/filtros-checkbox-tabla.component';

@Component({
  selector: 'design-report-inventario',
  standalone: true,
  imports: [
    DesignPagePortadaComponent,
    DesignPageTablaDatosComponent,
    DesignPageFinalComponent,
    FiltrosCheckboxTablaComponent,
  ],
  templateUrl: './design-report-inventario.component.html',
  styleUrl: './design-report-inventario.component.css',
})
export class DesignReportInventarioComponent {
  // ---------------------------------------------------------------------------------------
  // DECORADORES
  // ---------------------------------------------------------------------------------------

  @Input() citaSeleccionada: inventariosModel = {} as inventariosModel;
  @Input() detalleProductos: Array<detalleCarga> = [];

  @Input() rucEmpresa!: string;
  @Input() idCarga!: number;

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  datosInventario: inventariosModel = {} as inventariosModel;
  InventarioSeleccionado: inventariosModel = {} as inventariosModel;

  DetalleInventarioSeleccionado: Array<inventariosModel> = [];
  datosInventarioslista: Array<inventariosModel> = [];

  columnasSeleccionadas: string[] = [];

  private readonly ObjectInventario = inject(InventariosByIdUseCases);

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
        'unidad',
        'stockL',
        'stockfisico'
      ];
    }

    this.recibirColumnasSeleccionadas(this.columnasSeleccionadas);
  }

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  inventarioSeleccionado(rucEmpresa: string, idCarga: number) {
    this.ObjectInventario.getInventarioById(rucEmpresa, idCarga).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
        this.exportToPDF();
        // this.exportPDFPortada()
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
      { title: 'stockfisico', dataKey: 'stockfisico' },
    ];

    // Filtrar las columnas que deben aparecer en el PDF
    const filteredColumns = employeeColumns.filter(col => columnasSeleccionadas.includes(col.dataKey));

    // Filtrar los datos del inventario de acuerdo con las columnas visibles
    const employeeBody = this.citaSeleccionada.detalle.map((det) => {
      return filteredColumns.map(col => det[col.dataKey]);
    });

    (doc as any).autoTable({
      head: [filteredColumns.map(col => col.title)],
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
    });

    // Descargar el archivo PDF
    doc.save('reporte_inventario.pdf');
  }
  // ---------------------------------------------------------------------------------------
  // EXPORTAR PDF SOLO DETALLE
  // ---------------------------------------------------------------------------------------
  // exportToPDF() {
  //   const doc = new jsPDF({ orientation: 'landscape' });

  //   doc.setFontSize(18);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Reporte de IVENTARIO', 105, 15);

  //   doc.setFontSize(14);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 25);

  //   let finalY = 35;

  //   doc.setFontSize(14);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Inventarios', 14, finalY);
  //   finalY += 6;

  //   const employeeColumns = [
  //     { title: 'almacen', dataKey: 'almacen' },
  //     { title: 'sucursal', dataKey: 'sucursal' },
  //     { title: 'zona', dataKey: 'zona' },
  //     { title: 'pasillo', dataKey: 'pasillo' },
  //     { title: 'rack', dataKey: 'rack' },
  //     { title: 'ubicacion', dataKey: 'ubicacion' },
  //     { title: 'esagrupado', dataKey: 'esagrupado' },
  //     { title: 'codigogrupo', dataKey: 'codigogrupo' },
  //     { title: 'codigoproducto', dataKey: 'codigoproducto' },
  //     { title: 'codigobarra', dataKey: 'codigobarra' },
  //     { title: 'descripcionProducto', dataKey: 'descripcionProducto' },
  //     { title: 'unidad', dataKey: 'unidad' },
  //     { title: 'stockL', dataKey: 'stockL' },
  //     { title: 'stockfisico', dataKey: 'stockfisico' },
  //   ];

  //   const employeeBody = this.InventarioSeleccionado.detalle.map((det) => [
  //     det.almacen,
  //     det.sucursal,
  //     det.zona,
  //     det.pasillo,
  //     det.rack,
  //     det.ubicacion,
  //     det.esagrupado,
  //     det.codigogrupo,
  //     det.codigoproducto,
  //     det.codigobarra,
  //     det.descripcionProducto,
  //     det.unidad,
  //     det.stockL,
  //     det.stockfisico,
  //   ]);

  //   (doc as any).autoTable({
  //     head: [employeeColumns.map((col) => col.title)],
  //     body: employeeBody,
  //     startY: finalY,
  //     styles: {
  //       font: 'helvetica',
  //       fontSize: 8,
  //       cellPadding: 1,
  //       textColor: [34, 34, 34],
  //       fillColor: [255, 255, 255],
  //       lineColor: [44, 62, 80],
  //       lineWidth: 0.2,
  //     },
  //     headStyles: {
  //       fillColor: [52, 152, 219],
  //       textColor: [255, 255, 255],
  //       fontSize: 10,
  //       fontStyle: 'bold',
  //       halign: 'center',
  //     },
  //     alternateRowStyles: {
  //       fillColor: [245, 245, 245],
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 20 },
  //       1: { cellWidth: 21 },
  //       2: { cellWidth: 14 },
  //       3: { cellWidth: 17 },
  //       4: { cellWidth: 13 },
  //       5: { cellWidth: 23 },
  //       6: { cellWidth: 16 },
  //       7: { cellWidth: 'auto' },
  //       8: { cellWidth: 'auto' },
  //       9: { cellWidth: 'auto' },
  //       10: { cellWidth: 30 },
  //       11: { cellWidth: 20 },
  //     },
  //   });

  //   doc.setFontSize(10);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(
  //     'Reporte generado por el sistema DB INVENTORY - Contacto: Data Business S.A.C.',
  //     14,
  //     285
  //   );

  //   doc.save(`${this.InventarioSeleccionado.descripcion}.pdf`);
  //   // Guardar el PDF
  //   window.open(doc.output('bloburl'), '_blank');
  // }


  // ---------------------------------------------------------------------------------------
  // EXPORTAR PDF CON PORTADA Y FOOTER
  // ---------------------------------------------------------------------------------------
  // exportPDFPortada(): void {
  //   const content = document.getElementById('container-portada');
  //   const content1 = document.getElementById('container-final');

  //   if (content && content1) {
  //     // Crear un nuevo documento PDF
  //     const doc = new jsPDF('portrait', 'mm', 'a4');

  //     // Generar la primera parte (portada)
  //     html2canvas(content).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/jpeg', 1.0); // Convertir la imagen a base64
  //       doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Asegúrate de que las dimensiones coincidan con A4 (210x297 mm)
  //       doc.addPage(); // Añadir una nueva página

  //       // Generar la segunda parte (content1)
  //       html2canvas(content1).then((canvas1) => {
  //         const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
  //         doc.addImage(imgData1, 'JPEG', 0, 0, 210, 297); // Añadir la siguiente página
  //         doc.save('exported-file-portada.pdf'); // Guardar el archivo PDF combinado
  //       });
  //     });
  //   }
  // }

  // exportPDFPortada(): void {
  //   const content = document.getElementById('container-portada');
  //   const content1 = document.getElementById('container-final');

  //   if (content && content1) {
  //     const doc = new jsPDF();
  //     doc.addPage('portrait')
  //     html2canvas(content).then((canvas) => {
  //      ;
  //       const imgData = canvas.toDataURL('image/jpeg', 1.0);
  //       doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);

  //       doc.addPage('landscape');

  //       this.generatePDFDetail(doc).then(() => {
  //         doc.addPage('portrait');

  //         html2canvas(content1).then((canvas1) => {
  //           const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
  //           doc.addImage(imgData1, 'JPEG', 0, 0, 210, 297);
  //           doc.save('exported-file-portada.pdf');
  //         });
  //       });
  //     });
  //   }
  // }

  // generatePDFDetail(doc: jsPDF): Promise<void> {

  //   return new Promise((resolve) => {

  //     const pageWidth = 297; // Landscape width for A4 in mm
  //     const pageHeight = 210; // Landscape height for A4 in mm

  //     doc.setFontSize(18);
  //     doc.setFont('helvetica', 'bold');
  //     doc.text('Reporte de INVENTARIO', pageWidth / 2, 15, { align: 'center' });

  //     doc.setFontSize(14);
  //     doc.setFont('helvetica', 'normal');
  //     doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 25);

  //     let finalY = 35;

  //     doc.setFontSize(14);
  //     doc.setFont('helvetica', 'bold');
  //     doc.text('Inventarios', 14, finalY);
  //     finalY += 6;

  //     const employeeColumns = [
  //       'almacen', 'sucursal', 'zona', 'pasillo', 'rack', 'ubicacion',
  //       'esagrupado', 'codigogrupo', 'codigoproducto', 'codigobarra',
  //       'descripcionProducto', 'unidad', 'stockL', 'stockfisico'
  //     ];

  //     const employeeBody = this.InventarioSeleccionado.detalle.map((det) => [
  //       det.almacen,
  //       det.sucursal,
  //       det.zona,
  //       det.pasillo,
  //       det.rack,
  //       det.ubicacion,
  //       det.esagrupado,
  //       det.codigogrupo,
  //       det.codigoproducto,
  //       det.codigobarra,
  //       det.descripcionProducto,
  //       det.unidad,
  //       det.stockL,
  //       det.stockfisico,
  //     ]);

  //     // Ajustar el contenido al tamaño de la página en landscape
  //     (doc as any).autoTable({
  //       head: [employeeColumns],
  //       body: employeeBody,
  //       startY: finalY,
  //       styles: {
  //         font: 'helvetica',
  //         fontSize: 8,
  //         cellPadding: 1,
  //         textColor: [34, 34, 34],
  //         fillColor: [255, 255, 255],
  //         lineColor: [44, 62, 80],
  //         lineWidth: 0.2,
  //       },
  //       headStyles: {
  //         fillColor: [52, 152, 219],
  //         textColor: [255, 255, 255],
  //         fontSize: 10,
  //         fontStyle: 'bold',
  //         halign: 'center',
  //       },
  //       alternateRowStyles: {
  //         fillColor: [245, 245, 245],
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 30 },
  //         1: { cellWidth: 30 },
  //         2: { cellWidth: 20 },
  //         3: { cellWidth: 20 },
  //         4: { cellWidth: 20 },
  //         5: { cellWidth: 30 },
  //         6: { cellWidth: 20 },
  //         7: { cellWidth: 'auto' },
  //         8: { cellWidth: 'auto' },
  //         9: { cellWidth: 'auto' },
  //         10: { cellWidth: 40 },
  //         11: { cellWidth: 30 },
  //       },
  //       tableWidth: pageWidth - 20, // Ajustar el ancho de la tabla al tamaño de la página
  //       margin: { left: 10, right: 10, top: finalY, bottom: 10 },
  //     });

  //     doc.setFontSize(10);
  //     doc.setFont('helvetica', 'normal');
  //     doc.text(
  //       'Reporte generado por el sistema DB INVENTORY - Contacto: Data Business S.A.C.',
  //       14,
  //       pageHeight - 10
  //     );

  //     resolve();
  //   });
  // }
}
