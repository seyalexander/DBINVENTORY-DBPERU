import {  Observable } from 'rxjs';
import { UsuariosGateway } from '../../models/seguridad/gateway/seguridad-gateway';
import { Injectable } from '@angular/core';
import { MensajeSeguridadModel } from '../../models/seguridad/mensajeSeguridad.model';


@Injectable({
  providedIn: 'root'
})

export class GetUsuariosUseCases {
  constructor( private readonly _seguridadGateWay: UsuariosGateway) {}

  ListarusUarios() : Observable<MensajeSeguridadModel> {
    return this._seguridadGateWay.ListarUsuarios();
  }
}
