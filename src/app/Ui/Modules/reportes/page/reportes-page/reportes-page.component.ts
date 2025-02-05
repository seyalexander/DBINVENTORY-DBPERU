import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'reportes-page',
  standalone: true,
  imports: [
    RouterOutlet
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

}
