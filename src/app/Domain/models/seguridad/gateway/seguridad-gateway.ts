import { Observable } from "rxjs";
import { SeguridadModel } from "../seguridad.model";

export abstract class UsuariosGateway {
  abstract ListarUsuarios(): Observable<Array<SeguridadModel>>;
  abstract login(rucempresa: string, idUsuario: string, contrasena: string): Observable<string>;
}
