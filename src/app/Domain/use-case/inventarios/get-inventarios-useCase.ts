import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { inventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { inventariosModel } from '../../models/inventarios/inventarios.models';


@Injectable({
  providedIn: 'root'
})


export class InventariosUseCases {
  constructor( private readonly _getInventariosGateWay: inventariosGateway) {}

  getInventarios() : Observable<Array<inventariosModel>> {
    return this._getInventariosGateWay.getInventarios();
  }
}
