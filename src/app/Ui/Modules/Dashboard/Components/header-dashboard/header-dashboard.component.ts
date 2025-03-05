import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { GetUsuariosByIdUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarioById-useCase';
import { Subscription } from 'rxjs';
import { RequestDetalleUsuario } from 'src/app/Domain/models/seguridad/requestDetalleUsuario.mode';
@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [
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

   datosSeguridadDetalle: SeguridadModel = {} as SeguridadModel;
    private readonly ObjectUsuario = inject(GetUsuariosByIdUseCases);
    private actualizarUsuario: Subscription | undefined;

    ngOnInit(): void {
      const usuarioLogueado = sessionStorage.getItem('user') ?? ''
      this.ObtenerDetalleUsuario(usuarioLogueado)

    }

    ObtenerDetalleUsuario(idusuario: string) {
      if (idusuario != '') {
        const reqDatos: RequestDetalleUsuario = { idusuario };
        this.actualizarUsuario = this.ObjectUsuario.detalleUsuario(
          reqDatos
        ).subscribe((response: SeguridadModel) => {
          this.datosSeguridadDetalle = response;
        });
      } else {
        this.logout()
      }
    }

    ngOnDestroy(): void {
      this.actualizarUsuario?.unsubscribe();
    }


}
