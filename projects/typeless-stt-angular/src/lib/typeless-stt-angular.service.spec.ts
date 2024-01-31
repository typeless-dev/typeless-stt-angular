import { TestBed } from '@angular/core/testing';

import { TypelessSttAngularService } from './typeless-stt-angular.service';

describe('TypelessSttAngularService', () => {
  let service: TypelessSttAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypelessSttAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
