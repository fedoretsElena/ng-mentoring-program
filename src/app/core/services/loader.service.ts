import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showSink: BehaviorSubject<boolean> = new BehaviorSubject(false);

  show$: Observable<boolean> = this.showSink.asObservable()
    .pipe(
      debounceTime(200)
    );

  constructor() {
  }

  onShow(state: boolean): void {
    this.showSink.next(state);
  }
}
