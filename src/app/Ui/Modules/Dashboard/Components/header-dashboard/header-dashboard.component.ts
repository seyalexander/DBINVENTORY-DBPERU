import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SectionOpcionesComponent } from '../section-opciones/section-opciones.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [
    SectionOpcionesComponent,
    MatIcon
  ],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent {

  private readonly router = inject(Router);
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  IrUsuarioLogin(): void {
    this.router.navigate(['/dashboard', 'modulos', 'usuarioLogueado'])
  }


}
