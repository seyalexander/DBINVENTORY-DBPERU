import { detalleCarga } from "../cargaDatos/cargaDatos.model";

export class inventariosModel {
  rucempresa: string = ""
	idcarga: number = 0;
	fechacarga: string = ""
	fechainicio: string = ""
	totalregistros: number = 0;
	estado: string = ""
	fechacreacion: string = ""
	usuariocreacion: string = ""
	fechamodificacion: string = ""
	usuariomodificacion: string = ""
	dependecarga: number = 0;
	descripcion: string = ""
  usuarioAsignado: string = ""
  detalle: Array<detalleCarga> = []
}
