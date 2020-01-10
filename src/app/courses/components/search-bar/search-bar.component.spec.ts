import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
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

  // leave for example
  xit('should call onSubmit() after submit form (triggerEventHandler)', () => {
    const searchForm = fixture.debugElement.query(By.css('.search-form__input'));

    searchForm.triggerEventHandler('ngModelChange', null);
  });

  it('should raise search value after changing', (done) => {
    const newValue = 'test2';

    component.changeSearch.subscribe((v) => {
      expect(v).toBe(newValue);
      done();
    });

    component.searchControl.setValue(newValue);
  });

  it('should reset search value', (done) => {
    component.search$.subscribe((v) => {
      expect(v).toBeNull();
      done();
    });

    component.onReset();
  });
});
