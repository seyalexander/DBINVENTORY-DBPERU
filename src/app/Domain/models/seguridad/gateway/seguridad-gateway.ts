import { Observable } from "rxjs";
import { SeguridadModel } from "../seguridad.model";
import { MensajeSeguridadModel } from "../mensajeSeguridad.model";

export abstract class UsuariosGateway {
  abstract ListarUsuarios(): Observable<MensajeSeguridadModel>
  abstract newUsuario(usuario: SeguridadModel): Observable<object>
  // abstract login(rucempresa: string, idUsuario: string, contrasena: string): Observable<string>
  abstract login(rucempresa: string, idUsuario: string, contrasena: string): Observable<{ token: string, usuario: SeguridadModel }>;
}
