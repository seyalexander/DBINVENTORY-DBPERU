import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { inventariosModel } from '../../models/inventarios/inventarios.models';
import { requestDatosasignar } from '../../models/inventarios/requestObtenerDatosAsignar.model';


@Injectable({
  providedIn: 'root'
})


export class InventariosByIdUseCases {
  constructor( private readonly _getInventariosGateWay: InventariosGateway) {}

  getInventarioById(reqDatos:requestDatosasignar): Observable<inventariosModel> {
    return this._getInventariosGateWay.getInventarioById(reqDatos);
  }
}
