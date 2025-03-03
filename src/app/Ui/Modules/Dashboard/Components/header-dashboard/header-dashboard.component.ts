import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SectionTargetsDatosComponent } from '../section-targets-datos/section-targets-datos.component';
@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [
    SectionTargetsDatosComponent,
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
