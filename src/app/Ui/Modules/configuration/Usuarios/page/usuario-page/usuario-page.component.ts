import { Component } from '@angular/core';
import { TableUsuariosComponent } from '../../components/tables/table-usuarios/table-usuarios.component';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { SectionOpcionesComponent } from '@modules/Dashboard/Components/section-opciones/section-opciones.component';

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
  cantidadUsuarios: number = 0;
  p: number = 1;

  constructor(private readonly _usuario: SeguridadService) {}

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

  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
  }

  ngOnDestroy(): void {
    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }
  }
}
