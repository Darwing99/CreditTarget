import { TestBed } from '@angular/core/testing';

import { SesionUserService } from './sesion-user.service';

describe('SesionUserService', () => {
  let service: SesionUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
