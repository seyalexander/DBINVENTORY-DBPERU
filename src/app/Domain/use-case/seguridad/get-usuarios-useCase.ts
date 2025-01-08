import {  Observable } from 'rxjs';
import { SeguridadModel } from '../../models/seguridad/seguridad.model';
import { UsuariosGateway } from '../../models/seguridad/gateway/seguridad-gateway';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class GetUsuariosUseCases {
  constructor( private readonly _seguridadGateWay: UsuariosGateway) {}

  ListarusUarios() : Observable<Array<SeguridadModel>> {
    return this._seguridadGateWay.ListarUsuarios();
  }
}
