import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IconsSvgDocumentacion, IconsSvgHome } from '../../../../Shared/Components/icons/svg/icons-svg/icons-svg.component';
import { HeaderConfigurationComponent } from '../components/header-configuration/header-configuration.component';

@Component({
  selector: 'configuration-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderConfigurationComponent,
    IconsSvgDocumentacion,
    IconsSvgHome
  ],
  templateUrl: './configuration-home.component.html',
  styleUrl: './configuration-home.component.css'
})
export class ConfigurationHomeComponent {
  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  constructor() {}

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
        name: 'Empresas',
        icon: 'uil uil-estate',
        route: ['/','dashboard','configuracion'],
      },
      {
        name: 'Usuarios',
        icon: 'uil uil-estate',
        route: ['/','dashboard','configuracion', 'usuario'],
      },
      {
        name: 'Tipo Usuario',
        icon: 'uil uil-estate',
        route: ['/','dashboard','configuracion', 'tipoUsuario'],
      }

    ]

  }

}
