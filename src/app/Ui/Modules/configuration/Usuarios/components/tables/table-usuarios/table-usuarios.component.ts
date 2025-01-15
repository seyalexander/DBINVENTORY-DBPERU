import { Component } from '@angular/core';
import { SeguridadModel } from '../../../../../../../Domain/models/seguridad/seguridad.model';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../../../../Infraestructure/driven-adapter/seguridad/seguridad.service';
import { HeaderTableUsuariosComponent } from '../../header-table-usuarios/header-table-usuarios.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';

@Component({
  selector: 'table-usuarios',
  standalone: true,
  imports: [
    HeaderTableUsuariosComponent,
    FooterComponent
  ],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.css'
})
export class TableUsuariosComponent {
  private seguridadSubscription: Subscription | undefined;
  DatosUsuarios: Array<SeguridadModel> = [];
  cantidadUsuarios: number = 0

  ngOnInit(): void {
    this.listaUsuarios()
  }

  listaUsuarios() {
    this.seguridadSubscription = this._usuario
    .ListarUsuarios()
    .subscribe((response: SeguridadModel[]) => {
      this.DatosUsuarios = response
    });
  }

  constructor(private readonly _usuario: SeguridadService ){}

  ngOnDestroy(): void {
    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }
  }
}
