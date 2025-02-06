import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EncryptRutaService } from '../../../driven-adapter/encriptacion_ruta/encrypt-ruta.service';

@Injectable({
  providedIn: 'root'
})
export class routeEncryptionGuardGuard  {

  constructor(
    private readonly encryptRutaService: EncryptRutaService,
    private readonly router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const encryptedRoute = next.paramMap.get('encryptedRoute');
    if (!encryptedRoute) {
      return false;
    }

    const decryptedRoute = this.encryptRutaService.decrypt(encryptedRoute);

    const validRoutes = [
      'dashboard',
      'Cargar_inventario',
      'configuracion',
      'usuario',
      'reportes',
    ];

    if (validRoutes.includes(decryptedRoute)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
