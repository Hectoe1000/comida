import { TestBed } from '@angular/core/testing';

import { ClienteserviceService } from './clienteservice.service';

describe('ClienteserviceService', () => {
  let service: ClienteserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
