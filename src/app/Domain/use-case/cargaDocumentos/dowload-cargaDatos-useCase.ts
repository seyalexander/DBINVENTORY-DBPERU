
import { Inject, inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CargaDatosGateway } from '../../models/cargaDatos/gateway/cargaDatos-gateway';


@Injectable({
  providedIn: 'root'
})


export class DowloadCargaDatosUseCases {
  constructor( private _dowloadCargaDatosGateWay: CargaDatosGateway) {}

  DowloadCargaDatos() : Observable<object> {
    return this._dowloadCargaDatosGateWay.DowloadCargaDatos();
  }
}
