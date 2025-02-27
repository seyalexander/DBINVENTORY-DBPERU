import { Routes } from '@angular/router';

export const REPORTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./reports/reporte-inventario/reporte-inventario.component').then(m=>m.ReporteInventarioComponent)

  }
];
