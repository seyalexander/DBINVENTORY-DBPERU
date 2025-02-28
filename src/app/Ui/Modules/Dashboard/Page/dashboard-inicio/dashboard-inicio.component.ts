import { Component } from '@angular/core';
import { DashboardInicialComponent } from '@modules/Dashboard/Components/dashboard-inicial/dashboard-inicial.component';
import { HeaderDashboardComponent } from '@modules/Dashboard/Components/header-dashboard/header-dashboard.component';
import { SectionCantidadregistroInventariosComponent } from '@modules/Dashboard/Components/section-cantidadregistro-inventarios/section-cantidadregistro-inventarios.component';
import { SectionStatsComponent } from '@modules/Dashboard/Components/section-stats/section-stats.component';
import { SectionTargetsDatosComponent } from '@modules/Dashboard/Components/section-targets-datos/section-targets-datos.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';

@Component({
  selector: 'app-dashboard-inicio',
  standalone: true,
  imports: [
    HeaderDashboardComponent,
    SectionStatsComponent,
    SectionCantidadregistroInventariosComponent,
    FooterComponent,
    DashboardInicialComponent,
    SectionTargetsDatosComponent
  ],
  templateUrl: './dashboard-inicio.component.html',
  styleUrl: './dashboard-inicio.component.css'
})
export class DashboardInicioComponent {

}
