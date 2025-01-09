import { Component, inject, Input } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';


@Component({
  selector: 'descargar-reporte-pdf',
  standalone: true,
  imports: [],
  templateUrl: './descargar-reporte-pdf.component.html',
  styleUrl: './descargar-reporte-pdf.component.css'
})
export class DescargarReportePdfComponent {

  // ---------------------------------------------------------------------------------------
  // DECORADORES
  // ---------------------------------------------------------------------------------------
  @Input() rucEmpresa!: string;
  @Input() idCarga!: number;

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  datosInventario: inventariosModel = {} as inventariosModel;
  InventarioSeleccionado: inventariosModel = {} as inventariosModel;

  DetalleInventarioSeleccionado: Array<inventariosModel> = [];
  datosInventarioslista: Array<inventariosModel> = [];

  private readonly ObjectInventario = inject(InventariosByIdUseCases);

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN PRINCIPAL
  // ---------------------------------------------------------------------------------------
  ngOnInit(): void {
    // EJECUCIÓN DIRECTA
  }

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  inventarioSeleccionado(rucEmpresa: string, idCarga: number) {
    this.ObjectInventario.getInventarioById(rucEmpresa, idCarga).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
        this.exportToPDF();
      }
    );
  }

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN EXPORTAR PDF
  // ---------------------------------------------------------------------------------------
  exportToPDF() {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte de IVENTARIO', 105, 15);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 25);

    let finalY = 35;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Inventarios', 14, finalY);
    finalY += 6;

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

    const employeeBody = this.InventarioSeleccionado.detalle.map((det) => [
      det.almacen,
      det.sucursal,
      det.zona,
      det.pasillo,
      det.rack,
      det.ubicacion,
      det.esagrupado,
      det.codigogrupo,
      det.codigoproducto,
      det.codigobarra,
      det.descripcionProducto,
      det.unidad,
      det.stockL,
      det.stockfisico,
    ]);

    (doc as any).autoTable({
      head: [employeeColumns.map((col) => col.title)],
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
        0: { cellWidth: 20 },
        1: { cellWidth: 21 },
        2: { cellWidth: 14 },
        3: { cellWidth: 17 },
        4: { cellWidth: 13 },
        5: { cellWidth: 23 },
        6: { cellWidth: 16 },
        7: { cellWidth: 'auto' },
        8: { cellWidth: 'auto' },
        9: { cellWidth: 'auto' },
        10: { cellWidth: 30 },
        11: { cellWidth: 20 },
      },
    });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Reporte generado por el sistema DB INVENTORY - Contacto: Data Business S.A.C.',
      14,
      285
    );

    doc.save(`${this.InventarioSeleccionado.descripcion}.pdf`);
    // Guardar el PDF
    window.open(doc.output('bloburl'), '_blank');
  }

}
