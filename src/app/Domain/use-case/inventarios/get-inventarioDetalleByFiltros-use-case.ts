import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { detalleCarga } from '../../models/cargaDatos/cargaDatos.model';
import { RequestObtenerDetalleFiltros } from '../../models/inventarios/requestObtenerDetalleInventarioByFiltros.mode';

@Injectable({
  providedIn: 'root'
})

export class InventarioDetallesByFiltrosUseCases {

  constructor(
    private readonly _getInventariosGateWay: InventariosGateway,
  ) {}

  getDetalleInventarioByFiltros(reqDetalle: RequestObtenerDetalleFiltros): Observable<Array<detalleCarga>> {
    return this._getInventariosGateWay.getDetalleInventarioByFiltros(reqDetalle);
  }


}
