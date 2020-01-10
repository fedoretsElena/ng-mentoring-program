import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiConfig } from '../../core/services';
import { Author } from '../entitites';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authors: Author[];

  constructor(
    private http: HttpClient
  ) {
  }

  getAuthors(): Observable<Author[]> {
    return this.authors
      ? of(this.authors)
      : this.http.get(ApiConfig.AUTHORS_BASE_URL)
        .pipe(
          tap((res: Author[]) => this.authors = res)
        );
  }
}
