import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EncryptRutaService } from '../../../driven-adapter/encriptacion_ruta/encrypt-ruta.service';

@Injectable({
  providedIn: 'root'
})
export class routeEncryptionGuardGuard  {

  constructor(
    private encryptRutaService: EncryptRutaService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const encryptedRoute = next.paramMap.get('encryptedRoute');
    if (!encryptedRoute) {
      console.error('Ruta encriptada no encontrada');
      return false;
    }

    const decryptedRoute = this.encryptRutaService.decrypt(encryptedRoute);
    console.log('Ruta desencriptada:', decryptedRoute);

    const validRoutes = [
      'dashboard',
      'Cargar_inventario',
      'configuracion',
      'usuario',
      'reportes',
    ];

    if (validRoutes.includes(decryptedRoute)) {
      console.log('Ruta válida:', decryptedRoute);
      return true;
    } else {
      console.error('Ruta desencriptada no válida:', decryptedRoute);
      this.router.navigate(['/']);
      return false;
    }
  }

}
