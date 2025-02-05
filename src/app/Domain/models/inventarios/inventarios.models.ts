import { detalleCarga } from "../cargaDatos/cargaDatos.model";


export class inventariosModel {
  Descripcion: string = ""
  UsuarioAsignado: string = ""
  dependecarga: number = 0;
  descripcion: string = ""
  detalle: Array<detalleCarga> = []
  estado: string = ""
  fechacarga: string = ""
  fechacreacion: string = ""
  fechainicio: string = ""
  fechamodificacion: string = ""
  idcarga: number = 0;
  rucempresa: string = ""
	totalregistros: number = 0;
  usuarioAsignado: string = ""
	usuariocreacion: string = ""
  usuariomodificacion: string = ""
}
