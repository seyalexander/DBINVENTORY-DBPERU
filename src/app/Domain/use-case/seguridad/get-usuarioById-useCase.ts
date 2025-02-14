import {  Observable } from 'rxjs';
import { UsuariosGateway } from '../../models/seguridad/gateway/seguridad-gateway';
import { Injectable } from '@angular/core';
import { RequestDetalleUsuario } from '../../models/seguridad/requestDetalleUsuario.mode';
import { SeguridadModel } from '../../models/seguridad/seguridad.model';


@Injectable({
  providedIn: 'root'
})

export class GetUsuariosByIdUseCases {
  constructor( private readonly _seguridadGateWay: UsuariosGateway) {}

  detalleUsuario(reqdetalle: RequestDetalleUsuario): Observable<SeguridadModel> {
    return this._seguridadGateWay.detalleUsuario(reqdetalle);
  }
}




