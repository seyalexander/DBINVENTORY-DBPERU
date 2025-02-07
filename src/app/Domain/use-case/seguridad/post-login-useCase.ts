import { Injectable } from '@angular/core';
import { UsuariosGateway } from '../../models/seguridad/gateway/seguridad-gateway';
import { Observable } from 'rxjs';
import { RequestLoginModel } from '../../models/seguridad/requestLogin.model';
import { ResponseLoginModel } from '../../models/seguridad/responseLogin.model';

@Injectable({
  providedIn: 'root'
})

export class PostLoginUseCases {
  constructor( private readonly _seguridadGateWay: UsuariosGateway) {}

  execute(requestelogin: RequestLoginModel): Observable<ResponseLoginModel> {
    return this._seguridadGateWay.login(requestelogin);
  }
}
