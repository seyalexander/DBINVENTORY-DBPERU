import { EmpresasModel } from "./empresas.model"

export class MensajeResponseEmpresas {
  exito:string = ''
  msgerror:string = ''
  empresas: Array<EmpresasModel> = []
}
