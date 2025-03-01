import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';
import { Component, inject, signal } from '@angular/core';
import { TableUsuariosComponent } from '../../components/tables/table-usuarios/table-usuarios.component';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { Subscription } from 'rxjs';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [TableUsuariosComponent, RegistroUsuarioComponent],
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.css',
})
export class UsuarioPageComponent {

  private seguridadSubscription: Subscription | undefined;
  DatosUsuarios: Array<SeguridadModel> = [];

  private readonly _usuario = inject(SeguridadService)

  ngOnInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.seguridadSubscription = this._usuario
      .ListarUsuarios()
      .subscribe((response: MensajeSeguridadModel) => {
        this.DatosUsuarios = response.usuarios;
      });
  }


  ngOnDestroy(): void {
    this.seguridadSubscription?.unsubscribe();
  }

}
