import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { RequestLoginModel } from 'src/app/Domain/models/seguridad/requestLogin.model';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'apartado-derecho',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './apartado-derecho.component.html',
  styleUrl: './apartado-derecho.component.css'
})
export class ApartadoDerechoComponent {

  requestLogin: RequestLoginModel = {} as RequestLoginModel

  loginForm = this.formBuilder.group({
    rucempresa: ['', [Validators.required]],
    idUsuario: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]]
  });


  errorMessage: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly seguridadService: SeguridadService,
    private readonly router: Router
  ) {}


  get ruc() {
    return this.loginForm.controls.rucempresa;
  }

  get idUsuario() {
    return this.loginForm.controls.idUsuario;
  }

  get contrasenia() {
    return this.loginForm.controls.contrasenia;
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos.';
      return;
    }

    const reqLogin = this.requestLogin

    reqLogin.rucempresa = this.ruc.value?.trim() ?? '';
    reqLogin.idusuario = this.idUsuario.value?.trim() ?? '';
    reqLogin.contrasenia = this.contrasenia.value?.trim() ?? '';

    this.seguridadService.login(reqLogin).pipe(
      catchError((error) => {
        this.errorMessage = 'Credenciales incorrectas o problema de red.';
        console.error('Error en login:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }





  clearErrorMessage() {
    this.errorMessage = null;
  }
}
