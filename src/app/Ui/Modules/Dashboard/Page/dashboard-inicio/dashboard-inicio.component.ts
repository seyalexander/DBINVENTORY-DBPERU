import { Component } from '@angular/core';
import { HeaderDashboardComponent } from '@modules/Dashboard/Components/header-dashboard/header-dashboard.component';
import { SectionOpcionesComponent } from '@modules/Dashboard/Components/section-opciones/section-opciones.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';

@Component({
  selector: 'app-dashboard-inicio',
  standalone: true,
  imports: [
    HeaderDashboardComponent,
    FooterComponent,
    SectionOpcionesComponent,
  ],
  templateUrl: './dashboard-inicio.component.html',
  styleUrl: './dashboard-inicio.component.css'
})
export class DashboardInicioComponent {

}
