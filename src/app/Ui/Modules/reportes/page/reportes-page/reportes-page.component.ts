import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@modules/Carga_Inventario/Components/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'reportes-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './reportes-page.component.html',
  styleUrl: './reportes-page.component.css'
})
export class ReportesPageComponent {
  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  constructor(private readonly router: Router) {}

  ngOnInit(): void {

    this.mainMenu.defaultOptions = [
      {
        name: 'Cargar Inventario',
        icon: 'uil uil-estate',
        route: ['/','Cargar_inventario'],
      },
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Inventario',
        icon: 'uil uil-estate',
        route: ['/','dashboard','reporte'],
      },
      {
        name: 'Usuario',
        icon: 'uil uil-estate',
        route: ['/','dashboard','reporte'],
      },
      {
        name: 'Tipo Usuarios',
        icon: 'uil uil-estate',
        route: ['/','dashboard','reporte'],
      },
      {
        name: 'Empresa',
        icon: 'uil uil-estate',
        route: ['/','dashboard','reporte'],
      },
      {
        name: 'Tipo Documentos',
        icon: 'uil uil-estate',
        route: ['/','dashboard','reporte'],
      }
    ]

  }
}
