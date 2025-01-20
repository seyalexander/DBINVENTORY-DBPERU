import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
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

    const rucempresa = this.ruc.value?.trim() ?? '';
    const idUsuario = this.idUsuario.value?.trim() ?? '';
    const contrasena = this.contrasenia.value?.trim() ?? '';

    this.seguridadService.login(rucempresa, idUsuario, contrasena).pipe(
      catchError((error) => {
        this.errorMessage = 'Credenciales incorrectas o problema de red.';
        console.error('Error en login:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response?.token && response?.usuario) {
          // Guardar el token y el usuario en localStorage
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('usuarioLogueado', JSON.stringify(response.usuario));

          // Redirigir al dashboard
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
