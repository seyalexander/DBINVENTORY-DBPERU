import { Sucursales } from "./sucursales.model";

export class ResponseObtenerSucursales {
  exito: boolean = false
  msgerror: string = ''
  sucursales: Array<Sucursales> = []
}
