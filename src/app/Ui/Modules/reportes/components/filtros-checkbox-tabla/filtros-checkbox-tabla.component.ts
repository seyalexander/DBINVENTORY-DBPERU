import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filtros-checkbox-tabla',
  standalone: true,
  imports: [],
  templateUrl: './filtros-checkbox-tabla.component.html',
  styleUrl: './filtros-checkbox-tabla.component.css',
})
export class FiltrosCheckboxTablaComponent {

  @Output() columnasSeleccionadas = new EventEmitter<string[]>();

  columnas: { id: string; titulo: string; visible: boolean }[] = [
    { id: 'almacen', titulo: 'Almacén', visible: true },
    { id: 'sucursal', titulo: 'Sucursal', visible: true },
    { id: 'zona', titulo: 'Zona', visible: true },
    { id: 'pasillo', titulo: 'Pasillo', visible: true },
    { id: 'rack', titulo: 'Rack', visible: true },
    { id: 'ubicacion', titulo: 'Ubicación', visible: true },
    { id: 'esagrupado', titulo: 'Es Agrupado', visible: true },
    { id: 'codigogrupo', titulo: 'Cod. Grupo', visible: true },
    { id: 'codigoproducto', titulo: 'Cód. Product', visible: true },
    { id: 'codigobarra', titulo: 'Cod Barras', visible: true },
    { id: 'descripcionProducto', titulo: 'Descripción', visible: true },
    { id: 'unidad', titulo: 'Unidad', visible: true },
    { id: 'stockL', titulo: 'Stock L', visible: true },
    { id: 'stockfisico', titulo: 'Stock F', visible: true },
    { id: 'stockresultante', titulo: 'Stock R', visible: true },
  ];

  // Método para actualizar el estado de visibilidad
  toggleColumna(id: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const columna = this.columnas.find(c => c.id === id);
      if (columna) {
        columna.visible = input.checked;
      }
    }
    this.emitirColumnasSeleccionadas();
  }

  // Emitir las columnas seleccionadas (visibles)
  emitirColumnasSeleccionadas() {
    const columnasVisibles = this.columnas
      .filter(col => col.visible)
      .map(col => col.id);
    this.columnasSeleccionadas.emit(columnasVisibles);
  }
}
