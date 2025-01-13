
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { RolesGateway } from '../../models/roles/gateway/roles-gateway';
import { RolesModel } from '../../models/roles/roles.model';


@Injectable({
  providedIn: 'root'
})

export class GetRolesUseCases {
  constructor( private readonly _RolesGateWay: RolesGateway) {}

  ListarRoles() : Observable<Array<RolesModel>> {
    return this._RolesGateWay.ListarRoles();
  }
}
