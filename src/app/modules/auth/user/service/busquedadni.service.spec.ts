import { TestBed } from '@angular/core/testing';

import { BusquedadniService } from './busquedadni.service';

describe('BusquedadniService', () => {
  let service: BusquedadniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedadniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
