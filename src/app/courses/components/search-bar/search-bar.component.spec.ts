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
    const searchForm = fixture.debugElement.query(By.css('.search-form'));

    searchForm.triggerEventHandler('submit', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should log search value after onSubmit()', () => {
    const consoleLogSpy = spyOn(console, 'log');
    const search = 'NgRx course';

    component.search = search;
    fixture.detectChanges();

    component.onSubmit();

    expect(consoleLogSpy).toHaveBeenCalledWith('Search', search);
  });
});
