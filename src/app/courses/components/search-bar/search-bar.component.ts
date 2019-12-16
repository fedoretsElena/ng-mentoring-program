import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'cs-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {
  private searchSink: Subject<string> = new Subject<string>();
  private searchSub: Subscription;

  @Output()
  changeSearch: EventEmitter<string> = new EventEmitter<string>();

  search: string;

  search$ = this.searchSink.asObservable()
    .pipe(
      distinctUntilChanged(),
      debounceTime(200),
      filter((query: string) => query === null || query.length >= 3)
    );

  constructor() {

    this.searchSub = this.search$.subscribe((value: string) => {
      this.changeSearch.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  onSubmit(value: string): void {
    this.searchSink.next(value);
  }
}
