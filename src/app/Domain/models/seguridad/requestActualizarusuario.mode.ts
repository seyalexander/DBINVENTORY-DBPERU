export class ReqActualizarUsuario {
  rucempresa: string = ''
	idusuario: string = ''
	nombreusuario: string = ''
	apellido: string = ''
	cargo: string = ''
	estado: string = ''
	contrasenia: string = ''
	usuariomodificador: string = ''

  nombreTemporal?: string = '';
  editando?: boolean;

  apellidoTemporal?: string = '';
  editandoApellido?: boolean;
}
