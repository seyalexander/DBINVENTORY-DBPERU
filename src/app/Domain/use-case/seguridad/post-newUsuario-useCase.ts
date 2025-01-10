import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosGateway } from '../../models/seguridad/gateway/seguridad-gateway';
import { SeguridadModel } from '../../models/seguridad/seguridad.model';


@Injectable({
  providedIn: 'root'
})

export class PostUsuarioUseCases {

  constructor(private readonly _seguridadGateWay: UsuariosGateway) {}

  newUsuarioInventario (usuario: SeguridadModel) : Observable <object> {
    return this._seguridadGateWay.newUsuario(usuario);
  }
}
