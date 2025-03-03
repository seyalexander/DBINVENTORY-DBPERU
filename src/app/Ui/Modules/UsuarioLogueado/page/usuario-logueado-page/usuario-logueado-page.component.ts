import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestDetalleUsuario } from 'src/app/Domain/models/seguridad/requestDetalleUsuario.mode';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { GetUsuariosByIdUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarioById-useCase';

@Component({
  selector: 'app-usuario-logueado-page',
  standalone: true,
  imports: [],
  templateUrl: './usuario-logueado-page.component.html',
  styleUrl: './usuario-logueado-page.component.css'
})
export class UsuarioLogueadoPageComponent {
  datosSeguridadDetalle: SeguridadModel = {} as SeguridadModel;
  private readonly ObjectUsuario = inject(GetUsuariosByIdUseCases);
  private actualizarUsuario: Subscription | undefined;

  private readonly router = inject(Router);

  ngOnInit(): void {
    const usuarioLogueado = sessionStorage.getItem('user') ?? ''
    this.ObtenerDetalleUsuario(usuarioLogueado)

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
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
