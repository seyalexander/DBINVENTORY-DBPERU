import { Injectable } from '@angular/core';
import { inventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { Observable } from 'rxjs';
import { inventariosModel } from '../../models/inventarios/inventarios.models';

@Injectable({
  providedIn: 'root'
})

export class PostCabecerareatedUseCases {

  constructor( private readonly _getInventariosGateWay: inventariosGateway) {}

  newCabeceraInventario (cabecera: inventariosModel) : Observable <object> {
    return this._getInventariosGateWay.newCabecera(cabecera);
  }
}
