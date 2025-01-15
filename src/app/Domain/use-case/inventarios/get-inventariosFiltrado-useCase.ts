import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { inventariosModel } from '../../models/inventarios/inventarios.models';

@Injectable({
  providedIn: 'root'
})

export class InventariosFiltroUseCases {
  constructor(
    private readonly _getInventariosGateWay: inventariosGateway,
  ) {}

  getInventarios(filtro: 'todos' | 'asignados' | 'noAsignados') : Observable<Array<inventariosModel>> {
    return this._getInventariosGateWay.getInventariosFiltroUsuarioAsignado(filtro);
  }

}
