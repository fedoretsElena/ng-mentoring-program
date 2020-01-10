import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import { Author } from '../../entitites';
import { CustomValidators } from '../../../core/validators';

@Component({
  selector: 'cs-authors-select',
  templateUrl: './authors-select.component.html',
  styleUrls: ['./authors-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsSelectComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsSelectComponent implements ControlValueAccessor, Validator {
  @Input()
  placeholder: string;

  @Input()
  label: string;

  @Input()
  readonly authors: Author[] = [];

  search = '';
  isOpen: boolean;
  selected: Author[] = [];
  id = Math.round(Math.random() * +new Date());
  control: AbstractControl = new FormControl();

  get availableAuthors(): Author[] {
    return this.authors
      .filter((author: Author) => {
        const selectedIds: number[] = this.selected.map((item) => item.id);
        return !selectedIds.includes(author.id);
      })
      .filter((author) => author.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  constructor() { }

  onSelect(author: Author): void {
    this.selected = [...this.selected, author];

    this.resetSearch();
    this.toggleDropdown(false);
    this.writeValue(this.selected);
  }

  onDelete(author: Author): void {
    this.selected = this.filterById(this.selected, author.id);

    this.writeValue(this.selected);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;

    return CustomValidators.minArrLength(1)(this.control);
  }

  writeValue(value: any[]): void {
    if (value !== this.selected) {
      this.selected = [...value];
    }

    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onChange: any = () => {};

  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(state?: boolean): void {
    this.isOpen = state || !this.isOpen;
  }

  getVerticalPadding(selected: number): string {
    if (!selected) {
      return;
    }

    return Math.round(selected / 2) * 1.5 + 'rem';
  }

  private resetSearch(): void {
    this.search = '';
  }

  private filterById(list: Author[], authorId: number): Author[] {
    return list.filter(item => item.id !== authorId);
  }
}
