import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-breadcrumb.component.html',
  styleUrl: './header-breadcrumb.component.css'
})
export class HeaderBreadcrumbComponent {

}
