import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { detalleCarga } from '../../models/cargaDatos/cargaDatos.model';
import { RequestObtenerDetalle } from '../../models/inventarios/requestObtenerDetalle.model';

@Injectable({
  providedIn: 'root'
})

export class InventarioDetallesUseCases {

  constructor(
    private readonly _getInventariosGateWay: InventariosGateway,
  ) {}

  getDetalleInventario(reqDetalle: RequestObtenerDetalle): Observable<Array<detalleCarga>> {
    return this._getInventariosGateWay.getDetalleInventario(reqDetalle);
  }


}
