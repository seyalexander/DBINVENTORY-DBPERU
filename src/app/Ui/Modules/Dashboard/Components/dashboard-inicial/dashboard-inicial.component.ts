import { Component } from '@angular/core';
import { SectionCantidadregistroInventariosComponent } from '../section-cantidadregistro-inventarios/section-cantidadregistro-inventarios.component';
import { DiagramaOndasDashboardComponent } from '../diagrama-ondas-dashboard/diagrama-ondas-dashboard.component';
import { DiagramaCircularDashboardComponent } from '../diagrama-circular-dashboard/diagrama-circular-dashboard.component';

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



}
