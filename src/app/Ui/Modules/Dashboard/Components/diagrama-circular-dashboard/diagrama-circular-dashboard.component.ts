import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
Chart.register(...registerables);

@Component({
  selector: 'diagrama-circular-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './diagrama-circular-dashboard.component.html',
  styleUrl: './diagrama-circular-dashboard.component.css'
})
export class DiagramaCircularDashboardComponent {
  @ViewChild('pieChartInventario') chartElementInventario!: ElementRef;

  private chartInventario!: Chart;
  private inventarioSubscription: Subscription | undefined;
  private readonly listaInventarios = inject(InventariosUseCases);

  datosPorRUC: { ruc: string; cantidad: number }[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.listarInventariosPorRuc();
  }

  private listarInventariosPorRuc() {
    this.inventarioSubscription = this.listaInventarios.getInventarios().subscribe({
      next: (response: inventariosModel[]) => {
        this.datosPorRUC = this.procesarDatosPorRUC(response);
        this.createChartInventario();
      },
      error: () => {
        this.datosPorRUC = [];
      },
    });
  }

  private procesarDatosPorRUC(inventarios: inventariosModel[]): { ruc: string; cantidad: number }[] {
    const conteo: Record<string, number> = {};

    inventarios.forEach((inventario) => {
      if (inventario.rucempresa) {
        conteo[inventario.rucempresa] = (conteo[inventario.rucempresa] || 0) + 1;
      }
    });

    return Object.keys(conteo).map((ruc) => ({ ruc, cantidad: conteo[ruc] }));
  }

  private createChartInventario(): void {
    if (this.chartInventario) {
      this.chartInventario.destroy();
    }

    const ctx = this.chartElementInventario.nativeElement.getContext('2d');
    this.chartInventario = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.datosPorRUC.map(d => d.ruc),
        datasets: [
          {
            label: 'Cantidad de Inventarios',
            data: this.datosPorRUC.map(d => d.cantidad),
            backgroundColor: ['#00D1AE', '#0158DD', '#888888', '#20477E', '#8E44AD'],
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.inventarioSubscription?.unsubscribe();
  }
}
