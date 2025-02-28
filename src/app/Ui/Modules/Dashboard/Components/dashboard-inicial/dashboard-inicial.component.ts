import { Component, inject, Input } from '@angular/core';
import { SectionCantidadregistroInventariosComponent } from '../section-cantidadregistro-inventarios/section-cantidadregistro-inventarios.component';
import { DiagramaOndasDashboardComponent } from '../diagrama-ondas-dashboard/diagrama-ondas-dashboard.component';
import { DiagramaCircularDashboardComponent } from '../diagrama-circular-dashboard/diagrama-circular-dashboard.component';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { Subscription } from 'rxjs';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';

@Component({
  selector: 'dashboard-inicial',
  standalone: true,
  imports: [
    SectionCantidadregistroInventariosComponent,
    DiagramaOndasDashboardComponent,
    DiagramaCircularDashboardComponent
  ],
  templateUrl: './dashboard-inicial.component.html',
  styleUrl: './dashboard-inicial.component.css'
})
export class DashboardInicialComponent  {



  private inventarioSubscription: Subscription | undefined;
  private readonly listaInventarios = inject(InventariosUseCases);

  cantidadInventariosTotal: number = 0

  constructor() {}

  ngAfterViewInit(): void {
    this.listarInventariosPorMes();
  }

  private listarInventariosPorMes() {
    this.inventarioSubscription = this.listaInventarios.getInventarios().subscribe({
      next: (response: inventariosModel[]) => {
        this.cantidadInventariosTotal = response.length
      },
      error: () => {
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

  ngOnDestroy(): void {
    this.inventarioSubscription?.unsubscribe();
  }


}
