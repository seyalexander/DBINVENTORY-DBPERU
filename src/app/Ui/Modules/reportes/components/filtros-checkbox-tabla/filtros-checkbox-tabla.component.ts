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
    { id: 'codigogrupo', titulo: 'Cod Grupo', visible: true },
    { id: 'codigoproducto', titulo: 'Cod Producto', visible: true },
    { id: 'codigobarra', titulo: 'Cod Barras', visible: true },
    { id: 'descripcionProducto', titulo: 'Descripción', visible: true },
    { id: 'unidad', titulo: 'Unidad', visible: true },
    { id: 'stockL', titulo: 'Stock L', visible: true },
    { id: 'stockF', titulo: 'Stock F', visible: true },
    { id: 'stockresultante', titulo: 'Stock Resultante', visible: true },
  ];

  // Estado del checkbox "Seleccionar todas"
  todasSeleccionadas: boolean = true;

  // Método para alternar el estado de visibilidad de cada columna
  toggleColumna(id: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const columna = this.columnas.find(c => c.id === id);
    if (columna) {
      columna.visible = input.checked;
    }

    // Verificar si todas están seleccionadas
    this.todasSeleccionadas = this.columnas.every(col => col.visible);

    this.emitirColumnasSeleccionadas();
  }

  // Método para habilitar o deshabilitar todas las columnas
  toggleTodasLasColumnas(): void {
    this.todasSeleccionadas = !this.todasSeleccionadas;
    this.columnas.forEach(col => col.visible = this.todasSeleccionadas);
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
