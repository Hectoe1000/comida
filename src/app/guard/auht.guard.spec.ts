import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { auhtGuard } from './auht.guard';

describe('auhtGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auhtGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
