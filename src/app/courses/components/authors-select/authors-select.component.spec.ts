import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsSelectComponent } from './authors-select.component';
import { InputErrorsComponent } from '../../../shared/components';
import { FormControl, FormsModule } from '@angular/forms';

describe('AuthorsSelectComponent', () => {
  let component: AuthorsSelectComponent;
  let fixture: ComponentFixture<AuthorsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AuthorsSelectComponent,
        InputErrorsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsSelectComponent);
    component = fixture.componentInstance;

    component.selected = [{ id: 1, name: 'Vasya' }];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onTouched after blur event appeared', () => {
    const spy = spyOn(component, 'onTouched');

    component.onBlur();
    expect(spy).toHaveBeenCalled();
  });

  it('should delete author from selected list', () => {
    const mockAuthor = { id: 2, name: 'Test Name' };
    component.selected = [...component.selected, mockAuthor];
    expect(component.selected.length).toBe(2);

    component.onDelete(mockAuthor);
    expect(component.selected.length).toBe(1);
  });

  it('should return undefined if selected 0', () => {
    const res = component.getVerticalPadding(0);
    expect(res).toBeUndefined();
  });

  describe('toggleDropdown()', () => {

    it('should initialize by passed argument', () => {
      component.toggleDropdown(true);
      expect(component.isOpen).toBeTruthy();
    });

    it('should change to the opposite value if argument is missed', () => {
      component.isOpen = true;
      component.toggleDropdown();
      expect(component.isOpen).toBeFalsy();
    });
  });

  it('should initialize selected if value is not the same', () => {
    component.writeValue([]);
    expect(component.selected.length).toBe(0);
  });

  it('should initialize control', () => {
    const control = new FormControl([]);
    component.validate(control);
    expect(component.control.value).toEqual([]);
  });

  it('should add new author to selected list', () => {
   const author = { id: 5, name: 'Qury' };
   component.onSelect(author);

   expect(component.selected.find(item => item.id === author.id)).toBeDefined();
  });

  it('should exclude selected authors from the list', () => {
    const author = { id: 3, name: 'Zeva' };
    const selectedAuthor = { id: 2, name: 'Stepa' };
    // @ts-ignore
    component.authors = [author, selectedAuthor];
    component.selected = [selectedAuthor];
    fixture.detectChanges();

    expect(component.availableAuthors.find(item => item.id === selectedAuthor.id)).toBeUndefined();
  });

  it('should filter available authors according to search value', () => {
    // @ts-ignore
    component.authors = [{ id: 3, name: 'Zeva' }, { id: 2, name: 'Stepa' }];
    component.selected = [];
    component.search = 'Step';
    fixture.detectChanges();

    expect(component.availableAuthors.length).toBe(1);
  });

  it('should replace onChange func', () => {
    const func = () => null;
    component.registerOnChange(func);

    expect(component.onChange()).toBeNull();
  });

  it('should replace onTouch func', () => {
    const func = () => null;
    component.registerOnTouched(func);

    expect(component.onTouched()).toBeNull();
  });
});
