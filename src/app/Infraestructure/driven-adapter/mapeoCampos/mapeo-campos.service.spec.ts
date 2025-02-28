import { TestBed } from '@angular/core/testing';

import { MapeoCamposService } from './mapeo-campos.service';

describe('MapeoCamposService', () => {
  let service: MapeoCamposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapeoCamposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
