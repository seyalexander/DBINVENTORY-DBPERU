import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { inventariosModel } from '../../models/inventarios/inventarios.models';
import { RequestInventarioByFiltros } from '../../models/inventarios/requestInventariosByFiltros.model';

@Injectable({
  providedIn: 'root'
})

export class InventariosByFiltrosUseCases {
  constructor(
    private readonly _getInventariosGateWay: InventariosGateway,
  ) {}

  getInventariosByFiltros(requFiltros: RequestInventarioByFiltros) : Observable<Array<inventariosModel>> {
    return this._getInventariosGateWay.getInventariosByFiltros(requFiltros);
  }

}
