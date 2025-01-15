import { Observable } from "rxjs";
import { inventariosModel } from "../inventarios.models";

export abstract class inventariosGateway {
  abstract getInventarios(): Observable<Array<inventariosModel>>;
  abstract getInventariosFiltroUsuarioAsignado(filtro: 'todos' | 'asignados' | 'noAsignados'): Observable<Array<inventariosModel>>;
  abstract getInventarioById(rucEmpresa: string, idCarga: number): Observable<inventariosModel>
  abstract newCabecera(cabecera: inventariosModel): Observable<Object>
  abstract getUltimaCabceraRegistrada(rucEmpresa: string): Observable<number>
  abstract updateUsuarioAsignado(rucEmpresa: string, idCarga: number, usuarioId: string): Observable<Object>;
}
