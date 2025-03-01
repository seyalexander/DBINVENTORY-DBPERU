import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SectionOpcionesComponent } from '../section-opciones/section-opciones.component';
import { ButtonUsuarioLogueadoComponent } from '@modules/UsuarioLogueado/components/button-usuario-logueado/button-usuario-logueado.component';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [
    SectionOpcionesComponent,
    ButtonUsuarioLogueadoComponent
  ],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent {

  private readonly router = inject(Router);
  logout() {
    this.router.navigate(['/login']);
  }
}
