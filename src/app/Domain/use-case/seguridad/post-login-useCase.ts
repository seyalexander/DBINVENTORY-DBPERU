import { Injectable } from '@angular/core';
import { UsuariosGateway } from '../../models/seguridad/gateway/seguridad-gateway';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostLoginUseCases {
  constructor( private _seguridadGateWay: UsuariosGateway) {}

  execute(rucempresa: string , idUsuario: string, contrasena: string): Observable<string> {
    return this._seguridadGateWay.login(rucempresa, idUsuario, contrasena);
  }
}
