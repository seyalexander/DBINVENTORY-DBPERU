import { Routes } from '@angular/router';
import { ConfigurationHomeComponent } from './Configuration_home/configuration-home/configuration-home.component';


export const CONFIGURACION_ROUTES: Routes = [
  {
    path: '',
    component: ConfigurationHomeComponent,
     children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('../configuration/Empresas/empresas.routes').then(m=>m.EMPRESAS_ROUTE)
      },
      {
        path: 'usuario',
        loadChildren: () => import('../configuration/Usuarios/usuarios.routes').then(m=>m.USUARIOS_ROUTE)
      },
      {
        path: 'tipoUsuario',
        loadChildren: () => import('../configuration/Tipo_usuario/tipoUsuario.routes').then(m=>m.TIPO_USUARIO_ROUTE)
      },

    ]
  }
];
