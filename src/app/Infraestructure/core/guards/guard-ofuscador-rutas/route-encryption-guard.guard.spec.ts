import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeEncryptionGuardGuard } from '../route-encryption-guard.guard';

describe('routeEncryptionGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => routeEncryptionGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
