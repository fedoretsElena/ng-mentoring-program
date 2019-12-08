import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() after submit form (triggerEventHandler)', () => {
    const spy = spyOn(component, 'onSubmit');
    const searchForm = fixture.debugElement.query(By.css('.search-form__input'));

    searchForm.triggerEventHandler('ngModelChange', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should raise search value after onSubmit()', () => {
    let updatedSearch;
    const search = 'NgRx';

    component.changeSearch.subscribe(v => updatedSearch = v);

    component.onSubmit(search);

    expect(updatedSearch).toBe(search);
  });
});
