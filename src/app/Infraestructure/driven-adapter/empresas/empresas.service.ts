import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresasModel } from '../../../Domain/models/empresas/empresas.model';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { RequestDetalleEmpresa } from 'src/app/Domain/models/empresas/RequestDetalleEmpresa.model';
import { RequestObtenerSucursales } from 'src/app/Domain/models/empresas/RequestObtenerSucursal.model';
import { ResponseObtenerSucursales } from 'src/app/Domain/models/empresas/ResponseObtenerSucursales.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private readonly URL = environment.api;


  public ListarEmpresas(): Observable<MensajeResponseEmpresas> {
    return this.httpCliente
      .get<MensajeResponseEmpresas>(`${this.URL}/ObtenerEmpresas`, {
        headers: { 'Content-Type': 'application/json' },
      })
  }

  public newEmpresa(empresas: EmpresasModel): Observable<object> {
    return this.httpCliente
    .post(`${this.URL}/RegistrarEmpresa`, empresas, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  public DetalleEmpresa(req: RequestDetalleEmpresa): Observable<EmpresasModel> {
    return this.httpCliente
      .post<EmpresasModel>(`${this.URL}/ObtenerEmpresaByRuc`, req,{
        headers: { 'Content-Type': 'application/json' },
      })
  }

  public ListaSucursales(req: RequestObtenerSucursales): Observable<ResponseObtenerSucursales> {
    return this.httpCliente
      .post<ResponseObtenerSucursales>(`${this.URL}/ObtenerSucursales`, req,{
        headers: { 'Content-Type': 'application/json' },
      })
  }






  constructor(private readonly httpCliente: HttpClient) { }
}
