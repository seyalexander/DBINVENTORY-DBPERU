import { Observable } from "rxjs";

export abstract class CargaDatosGateway {
  abstract DowloadCargaDatos(): Observable<object>;
}
