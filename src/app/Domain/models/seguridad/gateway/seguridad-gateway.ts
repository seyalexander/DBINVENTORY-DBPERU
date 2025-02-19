import { Observable } from "rxjs";
import { SeguridadModel } from "../seguridad.model";
import { MensajeSeguridadModel } from "../mensajeSeguridad.model";
import { ResponseLoginModel } from "../responseLogin.model";
import { RequestLoginModel } from "../requestLogin.model";
import { RequestDetalleUsuario } from "../requestDetalleUsuario.mode";

export abstract class UsuariosGateway {
  abstract ListarUsuarios(): Observable<MensajeSeguridadModel>
  abstract newUsuario(usuario: SeguridadModel): Observable<object>
  abstract login(requestelogin: RequestLoginModel): Observable<ResponseLoginModel>;
  abstract detalleUsuario(reqdetalle: RequestDetalleUsuario): Observable<SeguridadModel>
}
