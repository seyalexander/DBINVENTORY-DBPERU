import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { inventariosModel } from '../../models/inventarios/inventarios.models';

@Injectable({
  providedIn: 'root'
})

export class InventariosUseCases {
  constructor(
    private readonly _getInventariosGateWay: InventariosGateway,
  ) {}

  getInventarios() : Observable<Array<inventariosModel>> {
    return this._getInventariosGateWay.getInventarios();
  }

}
