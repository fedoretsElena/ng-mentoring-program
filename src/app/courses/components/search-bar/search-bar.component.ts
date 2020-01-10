import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cs-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchControl: FormControl = new FormControl(null);

  @Output()
  changeSearch: EventEmitter<string> = new EventEmitter<string>();

  search$ = this.searchControl.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(200),
      filter((query: string) => query === null || query.length >= 3),
      tap((value: string) => this.changeSearch.emit(value))
    );

  constructor() {}

  onReset(): void {
    this.searchControl.reset();
  }
}
