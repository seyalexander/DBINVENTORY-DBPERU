import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm = this.formBuilder.group({
    rucempresa: ['', [Validators.required]],
    idUsuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
  });


  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}


  get ruc() {
    return this.loginForm.controls.rucempresa;
  }

  get idUsuario() {
    return this.loginForm.controls.idUsuario;
  }

  get contrasena() {
    return this.loginForm.controls.contrasena;
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos.';
      return;
    }


    const rucempresa = this.ruc.value?.trim() ?? '';
    const idUsuario = this.idUsuario.value?.trim() ?? '';
    const contrasena = this.contrasena.value?.trim() ?? '';

    this.seguridadService.login(rucempresa, idUsuario, contrasena).pipe(
      catchError((error) => {
        this.errorMessage = 'Credenciales incorrectas o problema de red.';
        console.error('Error en login:', error);
        return of(null);
      })
    ).subscribe({
      next: (token) => {
        if (token) {
          localStorage.setItem('authToken', token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Error inesperado al autenticar.';
        }
      },
      error: () => {
        this.errorMessage = 'No se pudo procesar su solicitud.';
      }
    });
  }



  clearErrorMessage() {
    this.errorMessage = null;
  }
}
