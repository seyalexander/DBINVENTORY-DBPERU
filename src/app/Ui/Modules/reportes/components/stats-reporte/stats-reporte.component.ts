import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'stats-reporte',
  standalone: true,
  templateUrl: './stats-reporte.component.html',
  styleUrl: './stats-reporte.component.css',
})
export class StatsReporteComponent implements OnChanges {
  @Input() detalleProductos: Array<detalleCarga> = [];

  positivos: number = 0;
  negativos: number = 0;
  ceros: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detalleProductos']?.currentValue) {
      this.contarStockResultados();
    }
  }

  contarStockResultados() {
    this.positivos = 0;
    this.negativos = 0;
    this.ceros = 0;

    this.detalleProductos.forEach((item) => {
      const diferencia = item.stockresultante;

      if (diferencia > 0) {
        this.positivos++;
      } else if (diferencia < 0) {
        this.negativos++;
      } else {
        this.ceros++;
      }
    });
  }
}
