import { Component } from '@angular/core';
import { TableListaTipoUsuarioComponent } from '../../components/tables/table-lista-tipo-usuario/table-lista-tipo-usuario.component';
import { Subscription } from 'rxjs';
import { RolesService } from 'src/app/Infraestructure/driven-adapter/roles/roles.service';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';

@Component({
  selector: 'app-tipo-usuario-page',
  standalone: true,
  imports: [TableListaTipoUsuarioComponent],
  templateUrl: './tipo-usuario-page.component.html',
  styleUrl: './tipo-usuario-page.component.css',
})
export class TipoUsuarioPageComponent {

  DatosRoles: Array<RolesModel> = [];

  private rolesSubscription: Subscription | undefined;

  constructor(private readonly _roles: RolesService) {}

  ngOnInit(): void {
    this.listaRoles();
  }

  listaRoles() {
    this.rolesSubscription = this._roles
      .ListarRoles()
      .subscribe((response: RolesModel[]) => {
        this.DatosRoles = response;

      });
  }

  ngOnDestroy(): void {
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
  }
}
