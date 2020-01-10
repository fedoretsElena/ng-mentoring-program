import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthorsService } from './authors.service';
import { Author } from '../entitites';
import { ApiConfig } from '../../core/services';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(AuthorsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return authors list', () => {
    const mockAuthors = [{id: 1, name: 'test'}];

    service.getAuthors()
      .subscribe((res: Author[]) => expect(res[0].id).toBe(mockAuthors[0].id));

    const req = httpMock.expectOne(ApiConfig.AUTHORS_BASE_URL);
    req.flush(mockAuthors);

    expect(req.request.method).toBe('GET');
  });

  it('should return authors list instead of request', () => {
    const mockAuthors = [{id: 1, name: 'test'}];
    service.authors = mockAuthors;

    service.getAuthors()
      .subscribe((res: Author[]) => expect(res[0].id).toBe(mockAuthors[0].id));
  });
});
