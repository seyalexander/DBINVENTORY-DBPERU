import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
  // currentUserNombre: BehaviorSubject<String> =new BehaviorSubject<String>("");
  // currentUserIdClient: BehaviorSubject<number> =new BehaviorSubject<number>(0);
  // currentUserIdEmpleado: BehaviorSubject<number> =new BehaviorSubject<number>(0);
  // currentCredenciales: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);

  //   constructor(private http: HttpClient) {
  //   const token = sessionStorage.getItem("jwt");
  //   const clienteId = sessionStorage.getItem("clienteId");
  //   const empleadoId = sessionStorage.getItem("empleado");
  //   const clienteNombre = sessionStorage.getItem("clienteNombre");
  //   const credenciales = sessionStorage.getItem("credentialNoExpired");
  //   this.currentUserIdClient = new BehaviorSubject<number>(empleadoId ? Number(empleadoId) : 0)
  //   this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("jwt")!=null);
  //   this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("jwt") || "");
  //   this.currentCredenciales=new BehaviorSubject<boolean>(credenciales != null);

  //   if (token) {
  //     this.currentUserLoginOn.next(true);
  //     this.currentUserData.next(token);
  //     if (empleadoId) {
  //       this.currentUserIdEmpleado.next(Number(empleadoId));
  //     }
  //     if (clienteNombre) {
  //       this.currentUserNombre.next(clienteNombre);
  //     }
  //     if (credenciales) {
  //       this.currentCredenciales.next(Boolean(credenciales));
  //     }
  //   }
  // }

  // login(credentials:LoginRequest):Observable<any>{
  //   return this.http.post<any>(environment.api+"/Login",credentials).pipe(
  //     tap( (userData) => {
  //       console.log("SERVICIO LOGIN:", userData);
  //       sessionStorage.setItem("jwt", userData.jwt);
  //       sessionStorage.setItem("empleado", userData.empleado);
  //       sessionStorage.setItem("credentialNoExpired", userData.credentialNoExpired);
  //       this.currentUserData.next(userData.jwt);
  //       this.currentUserIdClient.next(userData.cliente);
  //       this.currentUserIdEmpleado.next(userData.empleado)
  //       this.currentUserNombre.next(userData.cliente_razon);
  //       this.currentUserLoginOn.next(true);
  //       this.currentCredenciales.next(userData.credentialNoExpired);
  //     }),
  //     map((userData)=> userData.token),
  //     catchError(this.handleError)
  //   );
  // }

  // logout():void{
  //   sessionStorage.removeItem("jwt");
  //   this.currentUserLoginOn.next(false);
  //   this.currentCredenciales.next(false);
  // }

  // private handleError(error:HttpErrorResponse){
  //   if(error.status===0){
  //     console.error('Se ha producio un error ', error.error);
  //   }
  //   else{
  //     console.error('Backend retornó el código de estado ', error);
  //   }
  //   return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  // }

  // get userData():Observable<String>{
  //   return this.currentUserData.asObservable();
  // }

  // get userLoginOn(): Observable<boolean>{
  //   return this.currentUserLoginOn.asObservable();
  // }

  // get userToken():String{
  //   return this.currentUserData.value;
  // }
}
