import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { compralistaGuard } from './compralista.guard';

describe('compralistaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => compralistaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
