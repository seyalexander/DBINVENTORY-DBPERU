import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import { requestAsignarUsuario } from '../../models/inventarios/requestAsignarUsuario.model';
import { ResponseAsignacionModel } from '../../models/inventarios/responseAsignacion.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateUsuarioAsignadoUseCase {

  constructor(private readonly inventariosService: InventariosService) {}

  updateUsuarioAsignado(requUser: requestAsignarUsuario): Observable<ResponseAsignacionModel> {
    return this.inventariosService.updateUsuarioAsignado(requUser);
  }
}
