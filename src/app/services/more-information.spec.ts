import { TestBed } from '@angular/core/testing';

import { MoreInformation } from './more-information';

describe('MoreInformation', () => {
  let service: MoreInformation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreInformation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
