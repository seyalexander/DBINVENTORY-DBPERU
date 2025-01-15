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

  getInventarios() : Observable<Array<inventariosModel>> {
    return this._getInventariosGateWay.getInventariosFiltroUsuarioAsignado();
  }

}
