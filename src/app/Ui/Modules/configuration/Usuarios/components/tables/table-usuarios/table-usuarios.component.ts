import { Component } from '@angular/core';
import { SeguridadModel } from '../../../../../../../Domain/models/seguridad/seguridad.model';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../../../../Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'table-usuarios',
  standalone: true,
  imports: [],
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
      console.log(response)
    });
  }

  constructor(private _usuario: SeguridadService ){}

  ngOnDestroy(): void {
    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }
  }
}
