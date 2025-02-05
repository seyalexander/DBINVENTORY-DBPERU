
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { RolesGateway } from '../../models/roles/gateway/roles-gateway';
import { MensajeRolesModel } from '../../models/roles/mensajeRoles.model';


@Injectable({
  providedIn: 'root'
})

export class GetRolesUseCases {
  constructor( private readonly _RolesGateWay: RolesGateway) {}

  ListarRoles(estado: string) : Observable<MensajeRolesModel> {
    return this._RolesGateWay.ListarRoles(estado);
  }
}
