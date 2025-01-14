import { Component } from '@angular/core';
import { ApartadoDerechoComponent } from '@modules/login/components/apartado-derecho/apartado-derecho.component';
import { ApartadoIzquierdoComponent } from '@modules/login/components/apartado-izquierdo/apartado-izquierdo.component';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ApartadoIzquierdoComponent,
    ApartadoDerechoComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
