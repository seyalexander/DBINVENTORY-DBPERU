import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import { RequestAsignarUsuario } from '../../models/inventarios/requestAsignarUsuario.model';
import { ResponseAsignacionModel } from '../../models/inventarios/responseAsignacion.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateUsuarioAsignadoUseCase {

  constructor(private readonly inventariosService: InventariosService) {}

  updateUsuarioAsignado(requUser: RequestAsignarUsuario): Observable<ResponseAsignacionModel> {
    return this.inventariosService.updateUsuarioAsignado(requUser);
  }
}
