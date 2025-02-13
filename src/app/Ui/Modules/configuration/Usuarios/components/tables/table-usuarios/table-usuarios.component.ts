import { Component } from '@angular/core';
import { SeguridadModel } from '../../../../../../../Domain/models/seguridad/seguridad.model';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../../../../Infraestructure/driven-adapter/seguridad/seguridad.service';
import { HeaderTableUsuariosComponent } from '../../header-table-usuarios/header-table-usuarios.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { DetalleUsuarioPageComponent } from '@modules/configuration/Usuarios/page/detalle-usuario-page/detalle-usuario-page.component';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'table-usuarios',
  standalone: true,
  imports: [
    HeaderTableUsuariosComponent,
    FooterComponent,
    DetalleUsuarioPageComponent,
    NgxPaginationModule
  ],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.css'
})
export class TableUsuariosComponent {
  private seguridadSubscription: Subscription | undefined;
  DatosUsuarios: Array<SeguridadModel> = [];
  cantidadUsuarios: number = 0
  p: number = 1;

  ngOnInit(): void {
    this.listaUsuarios()
  }

  listaUsuarios() {
    this.seguridadSubscription = this._usuario
    .ListarUsuarios()
    .subscribe((response: MensajeSeguridadModel) => {
      this.DatosUsuarios = response.usuarios
    });
  }


  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
  }

  constructor(private readonly _usuario: SeguridadService ){}

  ngOnDestroy(): void {
    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }
  }
}
