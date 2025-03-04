import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosGateway } from '../../models/inventarios/gateway/inventarios-gateway';
import { ValidarDescripcion } from '../../models/inventarios/requestValidarDescripcion.model';
import { ResponseValidarDescripcion } from '../../models/inventarios/responseValidarDescripcion.model';

@Injectable({
  providedIn: 'root'
})

export class GetValidarDescripcionInventario {
  constructor(
    private readonly _getInventariosGateWay: InventariosGateway,
  ) {}

  getValidarDescripcion(requFiltros: ValidarDescripcion): Observable<ResponseValidarDescripcion> {
    return this._getInventariosGateWay.getValidarDescripcion(requFiltros)
  }

}
