import { TestBed } from '@angular/core/testing';

import { MenuAdministrationService } from './menu-administration.service';

describe('MenuAdministrationService', () => {
  let service: MenuAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
