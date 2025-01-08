
import { Inject, inject, Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { EmpresasGateway } from '../../models/empresas/gateway/empresas-gateway';
import { EmpresasModel } from '../../models/empresas/empresas.model';


@Injectable({
  providedIn: 'root'
})


export class getEmpresaUseCases {
  constructor( private _EmpresasGateWay: EmpresasGateway) {}

  ListarEmpresas() : Observable<Array<EmpresasModel>> {
    return this._EmpresasGateWay.ListarEmpresas();
  }
}
