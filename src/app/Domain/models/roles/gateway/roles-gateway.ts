import { Observable } from "rxjs";
import { MensajeRolesModel } from "../mensajeRoles.model";

export abstract class RolesGateway {
  abstract ListarRoles(estado: string): Observable<MensajeRolesModel>;
  // abstract newRoles(roles: RolesModel): Observable<object>
}
