import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inventariosModel } from '../../models/inventarios/inventarios.models';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';

@Injectable({
  providedIn: 'root'
})

export class PostCabecerareatedUseCases {

  constructor( private readonly _getInventariosGateWay: InventariosGateway) {}

  newCabeceraInventario (cabecera: inventariosModel) : Observable <object> {
    return this._getInventariosGateWay.newCabecera(cabecera);
  }
}
