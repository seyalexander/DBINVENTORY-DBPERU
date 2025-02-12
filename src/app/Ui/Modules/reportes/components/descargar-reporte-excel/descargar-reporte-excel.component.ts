import { Component, inject, Input } from '@angular/core';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';
import * as XLSX from 'xlsx';

@Component({
  selector: 'descargar-reporte-excel',
  standalone: true,
  imports: [],
  templateUrl: './descargar-reporte-excel.component.html',
  styleUrl: './descargar-reporte-excel.component.css'
})
export class DescargarReporteExcelComponent {

  // ---------------------------------------------------------------------------------------
  // DECORADORES
  // ---------------------------------------------------------------------------------------
  @Input() rucEmpresa!: string;
  @Input() idCarga!: number;

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  InventarioSeleccionado: inventariosModel = {} as inventariosModel;
  detalleInventario: Array<detalleCarga> = []

  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly ObjetDetalleInventario = inject(InventarioDetallesUseCases);

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN PARA OBTENER INVENTARIO Y EXPORTAR A EXCEL
  // ---------------------------------------------------------------------------------------
  inventarioSeleccionado(rucempresa: string, idcarga: number) {
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.detalleInventario.map((det) => ({
        almacen: det.almacen,
        sucursal: det.sucursal,
        zona: det.zona,
        pasillo: det.pasillo,
        rack: det.rack,
        ubicacion: det.ubicacion,
        esagrupado: det.esagrupado,
        codigogrupo: det.codigogrupo,
        codigoproducto: det.Codigoproducto,
        codigobarra: det.Codigobarra,
        descripcionProducto: det.descripcionProducto,
        unidad: det.Unidad,
        stockL: det.stockL,
        stockfisico: det.stockF,
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');

    // Nombre del archivo Excel
    const nombreArchivo = `${this.InventarioSeleccionado.descripcion}.xlsx`;

    // Guardar el archivo
    XLSX.writeFile(wb, nombreArchivo);
  }
}
