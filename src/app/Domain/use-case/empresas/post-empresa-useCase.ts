import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresasGateway } from '../../models/empresas/gateway/empresas-gateway';
import { EmpresasModel } from '../../models/empresas/empresas.model';



@Injectable({
  providedIn: 'root'
})

export class PostEmpresaUseCases {

  constructor( private _getEmpresaGateWay: EmpresasGateway) {}

  newEmpresaInventario (empresa: EmpresasModel) : Observable <object> {
    return this._getEmpresaGateWay.newEmpresa(empresa);
  }
}
