import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import { requestAsignarUsuario } from '../../models/inventarios/requestAsignarUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateUsuarioAsignadoUseCase {

  constructor(private readonly inventariosService: InventariosService) {}

  updateUsuarioAsignado(requUser: requestAsignarUsuario): Observable<Object> {
    return this.inventariosService.updateUsuarioAsignado(requUser);
  }
}
