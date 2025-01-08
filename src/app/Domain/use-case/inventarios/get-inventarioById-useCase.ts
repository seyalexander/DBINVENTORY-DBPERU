import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { inventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { inventariosModel } from '../../models/inventarios/inventarios.models';


@Injectable({
  providedIn: 'root'
})


export class InventariosByIdUseCases {
  constructor( private _getInventariosGateWay: inventariosGateway) {}

  getInventarioById(rucEmpresa: string, idCarga: number): Observable<inventariosModel> {
    return this._getInventariosGateWay.getInventarioById(rucEmpresa, idCarga);
  }
}
