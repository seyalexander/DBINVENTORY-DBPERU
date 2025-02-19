import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';
Chart.register(...registerables);

@Component({
  selector: 'section-cantidadregistro-inventarios',
  standalone: true,
  imports: [],
  templateUrl: './section-cantidadregistro-inventarios.component.html',
  styleUrl: './section-cantidadregistro-inventarios.component.css',
})
export class SectionCantidadregistroInventariosComponent {
  @ViewChild('barChart_inventario') chartElementInventario!: ElementRef;

  private chartInventario!: Chart;

  constructor() {}

  ngAfterViewInit(): void {
    this.actualizarGraficos();
  }

  private actualizarGraficos(): void {
    setTimeout(() => {
      this.createChartInventario();
    }, 500);
  }

  private createChartInventario(): void {
    if (this.chartInventario) {
      this.chartInventario.destroy();
    }

    const ctx = this.chartElementInventario.nativeElement.getContext('2d');
    this.chartInventario = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total', 'Asignados', 'Sin asignar'],
        datasets: [
          {
            label: 'Inventarios',
            data: [
              this.datosInventarioslista,
              this.datosInventariosAsignados,
              this.datosInventariosNoAsignados
            ],
            backgroundColor: ['#0158DD', '#00D1AE', '#20477E'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  }



  // =====================================================================
  // LLAMADO DE DATOS
  // =====================================================================
  private inventarioSubscription: Subscription | undefined;
  private inventarioAsignadosSubscription: Subscription | undefined;
  private inventarioNoAsignadosSubscription: Subscription | undefined;

  datosInventarioslista: number = 0;
  datosInventariosAsignados: number = 0;
  datosInventariosNoAsignados: number = 0;
  cantidadUsuarios: number = 0;
  p: number = 1;

  private readonly listaInventarios = inject(InventariosUseCases);
  private readonly _usuario = inject(SeguridadService);

  ngOnInit(): void {
    this.listarInventarios()
    this.listarInventariosAsignados()
    this.listarInventariosNoAsignados()
  }


  listarInventarios() {
    this.inventarioSubscription = this.listaInventarios
      .getInventarios()
      .subscribe({
        next: (response: inventariosModel[]) => {
          this.datosInventarioslista = response.length;
          this.actualizarGraficos();
        },
        error: () => {
          this.datosInventarioslista = 0;
        },
      });
  }

  listarInventariosAsignados() {
    this.inventarioAsignadosSubscription = this.listaInventarios
      .getInventarios()
      .subscribe({
        next: (response: inventariosModel[]) => {
          this.datosInventariosAsignados = response.filter(
            (inventario) =>
              inventario.UsuarioAsignado && inventario.UsuarioAsignado.trim() !== ''
          ).length;
          this.actualizarGraficos();
        },
        error: () => {
          this.datosInventariosAsignados = 0;
        },
      });
  }

  listarInventariosNoAsignados() {
    this.inventarioNoAsignadosSubscription = this.listaInventarios
      .getInventarios()
      .subscribe({
        next: (response: inventariosModel[]) => {
          this.datosInventariosNoAsignados = response.filter(
            (inventario) =>
              !inventario.UsuarioAsignado || inventario.UsuarioAsignado.trim() === ''
          ).length;
          this.actualizarGraficos();
        },
        error: () => {
          this.datosInventariosNoAsignados = 0;
        },
      });
  }

  ngOnDestroy(): void {
    this.inventarioSubscription?.unsubscribe();
    this.inventarioAsignadosSubscription?.unsubscribe();
    this.inventarioNoAsignadosSubscription?.unsubscribe();
  }
}
