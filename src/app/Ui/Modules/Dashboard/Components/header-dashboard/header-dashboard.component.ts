import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent {

  constructor(
        private readonly seguridadService: SeguridadService,
        private readonly router: Router
      ) {}

  logout() {
    this.seguridadService.logout();
    this.router.navigate(['/login']);
  }

}
