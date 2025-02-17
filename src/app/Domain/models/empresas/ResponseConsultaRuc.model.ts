import { EmpresasModel } from "./empresas.model"

export class ResponseConsultaRuc {
  success: boolean = false
  result: EmpresasModel = {} as EmpresasModel
}
