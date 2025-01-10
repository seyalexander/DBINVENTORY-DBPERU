import { EmpresasModel } from "../empresas/empresas.model"

export class SeguridadModel {
    // rucempresa: EmpresasModel = {} as EmpresasModel
    rucempresa: string = ""
    idusuario: string = ""
    nombreusuario : string = ""
    apellido: string = ""
    cargo: string = ""
    estado: string = ""
    contrasenia: string = ""
    token: string = ""
    usuariocreador: string = ""
    fechacreacion: string = ""
    usuariomodificador: string = ""
    fechamodificacion: string = ""
}
