import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptRutaService {

  private encrypt_token: string = environment.encryptRuta

  // Encriptar la ruta
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.encrypt_token).toString();
  }

  // Desencriptar la ruta
  decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.encrypt_token);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
