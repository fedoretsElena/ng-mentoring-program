import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  search: string;

  @Output()
  changeSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  onSubmit(value: string): void {
    this.changeSearch.emit(value);
  }
}
