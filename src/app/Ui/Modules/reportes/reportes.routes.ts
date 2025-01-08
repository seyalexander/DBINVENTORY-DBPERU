import { Routes } from '@angular/router';
import { ReportesPageComponent } from './page/reportes-page/reportes-page.component';

export const REPORTES_ROUTES: Routes = [
  {
    path: '',
    component: ReportesPageComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./reports/reporte-inventario/reporte-inventario.component').then(m=>m.ReporteInventarioComponent),
      },
    ]
  }
];
