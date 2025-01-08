import { TestBed } from '@angular/core/testing';

import { EncryptRutaService } from './encrypt-ruta.service';

describe('EncryptRutaService', () => {
  let service: EncryptRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
