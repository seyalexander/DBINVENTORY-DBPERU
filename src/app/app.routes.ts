import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./Ui/Modules/login/page/login-page/login-page.component').then(m=>m.LoginPageComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Ui/Modules/inicio/inicio.component').then(m=>m.InicioComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./Ui/Modules/Dashboard/Page/dashboard-inicio/dashboard-inicio.component').then(m=>m.DashboardInicioComponent),
      },
      {
        path: 'modulos',
        loadComponent: () => import('./Ui/Modules/modulos/page/lista-modulo-page/lista-modulo-page.component').then(m=>m.ListaModuloPageComponent),
        children: [
          {
            path: 'CargarInventario',
            loadChildren: () => import('./Ui/Modules/Carga_Inventario/carga_inventario.routes').then(m=>m.CARGA_INVENTARIOS_ROUTES),
          },
          {
            path: 'asignaciones',
            loadChildren: () => import('./Ui/Modules/Asignaciones/asignaciones.routes').then(m=>m.ASIGNACIONES_INVENTARIOS_ROUTES),
          },
          {
            path: 'reportes',
            loadChildren: () => import('./Ui/Modules/reportes/reportes.routes').then(m=>m.REPORTES_ROUTES),
          },
          {
            path: 'empresas',
            loadChildren: () => import('./Ui/Modules/configuration/Empresas/empresas.routes').then(m=>m.EMPRESAS_ROUTE)
          },
          {
            path: 'usuario',
            loadChildren: () => import('./Ui/Modules/configuration/Usuarios/usuarios.routes').then(m=>m.USUARIOS_ROUTE)
          },
          {
            path: 'tipoUsuario',
            loadChildren: () => import('./Ui/Modules/configuration/Tipo_usuario/tipoUsuario.routes').then(m=>m.TIPO_USUARIO_ROUTE)
          },
          {
            path: 'usuarioLogueado',
            loadComponent: () => import('./Ui/Modules/UsuarioLogueado/page/usuario-logueado-page/usuario-logueado-page.component').then(m=>m.UsuarioLogueadoPageComponent)
          },
          {
            path: 'ajustesInventario',
            loadComponent: () => import('./Ui/Modules/AJUSTES-INVENTARIO/page/lista-inventarios-ajuste-page/lista-inventarios-ajuste-page.component').then(m=>m.ListaInventariosAjustePageComponent)
          },

        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];
