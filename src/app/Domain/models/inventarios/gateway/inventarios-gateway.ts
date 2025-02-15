import { Observable } from "rxjs";
import { inventariosModel } from "../inventarios.models";
import { RequestAsignarUsuario } from "../requestAsignarUsuario.model";
import { requestDatosasignar } from "../requestObtenerDatosAsignar.model";
import { ResponseAsignacionModel } from "../responseAsignacion.model";
import { RequestObtenerDetalle } from "../requestObtenerDetalle.model";
import { detalleCarga } from "../../cargaDatos/cargaDatos.model";
import { RequestAnularInventario } from "../requestAnularInventario.model";
import { ResponseAnularInventario } from "../responseAnularInventario.model";

export abstract class InventariosGateway {
  abstract getInventarios(): Observable<Array<inventariosModel>>;
  abstract getInventariosFiltroUsuarioAsignado(filtro: 'todos' | 'asignados' | 'noAsignados'): Observable<Array<inventariosModel>>;
  abstract getInventarioById(reqDatos:requestDatosasignar): Observable<inventariosModel>
  abstract newCabecera(cabecera: inventariosModel): Observable<Object>
  abstract getUltimaCabceraRegistrada(rucEmpresa: string): Observable<number>
  abstract updateUsuarioAsignado(requUser: RequestAsignarUsuario): Observable<ResponseAsignacionModel>;
  abstract getDetalleInventario(reqDetalle: RequestObtenerDetalle): Observable<Array<detalleCarga>>
  abstract anularInventario(requAnular: RequestAnularInventario): Observable<ResponseAnularInventario>
}
