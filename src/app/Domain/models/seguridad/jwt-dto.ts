export class JwtDTO {
  token: string = '';
  type: string = '';
  usernameUsuario: string = '';
  authorities: Array<string> = [];
}
