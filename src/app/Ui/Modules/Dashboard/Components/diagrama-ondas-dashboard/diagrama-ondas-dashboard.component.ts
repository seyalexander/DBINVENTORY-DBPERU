import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';

Chart.register(...registerables);

@Component({
  selector: 'diagrama-ondas-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './diagrama-ondas-dashboard.component.html',
  styleUrl: './diagrama-ondas-dashboard.component.css'
})
export class DiagramaOndasDashboardComponent {
  @ViewChild('lineChartInventario') chartElementInventario!: ElementRef;

  private chartInventario!: Chart;
  private inventarioSubscription: Subscription | undefined;
  private readonly listaInventarios = inject(InventariosUseCases);

  datosMensuales: number[] = Array(12).fill(0); // Un array con 12 ceros (uno por mes)

  constructor() {}

  ngAfterViewInit(): void {
    this.listarInventariosPorMes();
  }

  private listarInventariosPorMes() {
    this.inventarioSubscription = this.listaInventarios.getInventarios().subscribe({
      next: (response: inventariosModel[]) => {
        this.datosMensuales = this.procesarDatosPorMes(response);
        this.createChartInventario();
      },
      error: () => {
        this.datosMensuales = Array(12).fill(0);
      },
    });
  }

  private procesarDatosPorMes(inventarios: inventariosModel[]): number[] {
    let dataPorMes = Array(12).fill(0);

    inventarios.forEach((inventario) => {
      if (inventario.fechacreacion) {
        let fecha = new Date(inventario.fechacreacion);
        let mes = fecha.getMonth();
        dataPorMes[mes]++;
      }
    });

    return dataPorMes;
  }

  private createChartInventario(): void {
    if (this.chartInventario) {
      this.chartInventario.destroy();
    }

    const ctx = this.chartElementInventario.nativeElement.getContext('2d');
    this.chartInventario = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        datasets: [
          {
            label: 'Inventarios Registrados',
            data: this.datosMensuales,
            borderColor: '#00D1AE',
            backgroundColor: 'rgba(0, 209, 174, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.4, // Suaviza la línea
            pointBackgroundColor: '#0158DD',
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.inventarioSubscription?.unsubscribe();
  }
}
