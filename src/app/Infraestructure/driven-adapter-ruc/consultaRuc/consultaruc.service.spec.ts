import { TestBed } from '@angular/core/testing';

import { ConsultarucService } from './consultaruc.service';

describe('ConsultarucService', () => {
  let service: ConsultarucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
