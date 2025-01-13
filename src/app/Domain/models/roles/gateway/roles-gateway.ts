import { Observable } from "rxjs";
import { RolesModel } from "../roles.model";

export abstract class RolesGateway {
  abstract ListarRoles(): Observable<Array<RolesModel>>;
  // abstract newRoles(roles: RolesModel): Observable<object>
}
