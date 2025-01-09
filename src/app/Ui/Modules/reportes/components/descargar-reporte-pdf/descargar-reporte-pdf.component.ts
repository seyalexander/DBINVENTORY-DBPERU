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

  @Input() rucEmpresa!: string;
  @Input() idCarga!: number;


  datosInventarioslista: Array<inventariosModel> = [];
  datosInventario: inventariosModel = {} as inventariosModel;

  InventarioSeleccionado: inventariosModel = {} as inventariosModel;
  DetalleInventarioSeleccionado: Array<inventariosModel> = [];

  ngOnInit(): void {
    // EJECUCIÓN DIRECTA
  }

  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  inventarioSeleccionado(rucEmpresa: string, idCarga: number) {
    this.ObjectInventario.getInventarioById(rucEmpresa, idCarga).subscribe(
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
    doc.text('Reporte de IVENTARIO', 105, 15);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 25);

    let finalY = 35;

    // Sección: Información Principal
    // doc.setFontSize(16);
    // doc.setFont('helvetica', 'bold');
    // doc.text('Información Principal', 14, finalY);
    // finalY += 6;

    // Definir las columnas para la tabla principal
    // const columns = [
    //   { title: 'Inventario', dataKey: 'razon_Social' },
    //   { title: 'Ruc Empresa', dataKey: 'matricula' },
    //   { title: 'Usuario', dataKey: 'chofer' },
    // ];

    // Generar la tabla principal
    // (doc as any).autoTable({
    //   head: [columns.map(col => col.title)],
    //   body: [
    //     [
    //       this.datosInventario.descripcion,
    //       this.datosInventario.rucempresa,
    //       this.datosInventario.usuariocreacion
    //     ]
    //   ],
    //   startY: finalY,
    //   styles: {
    //     font: 'helvetica',
    //     fontSize: 10,
    //     cellPadding: 4,
    //     textColor: [34, 34, 34],
    //     fillColor: [255, 255, 255],
    //     lineColor: [44, 62, 80],
    //     lineWidth: 0.2,
    //   },
    //   headStyles: {
    //     fillColor: [52, 152, 219],
    //     textColor: [255, 255, 255],
    //     fontSize: 12,
    //     fontStyle: 'bold',
    //     halign: 'center'
    //   },
    //   alternateRowStyles: {
    //     fillColor: [245, 245, 245]
    //   },
    //   columnStyles: {
    //     0: { cellWidth: 'auto' },
    //     1: { cellWidth: 'auto' },
    //     2: { cellWidth: 'auto' }
    //   }
    // });

    // finalY = (doc as any).lastAutoTable.finalY + 10;

    // Sección: Inventarios
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Inventarios', 14, finalY);
    finalY += 6;

    // Definir las columnas para la tabla de empleados
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
    // Generar el cuerpo de la tabla de empleados
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

    // Generar la tabla de inventarios
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

     finalY = (doc as any).lastAutoTable.finalY + 10;

    // Añadir pie de página
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
