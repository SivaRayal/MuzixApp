import { TestBed } from '@angular/core/testing';

import { FavouriteService } from './favourite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavouriteService', () => {
  let service: FavouriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FavouriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
