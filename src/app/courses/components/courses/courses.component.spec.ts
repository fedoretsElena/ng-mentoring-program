import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MockDirective } from 'ng-mocks';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { MemoizedSelector, Store } from '@ngrx/store';

import { CoursesComponent } from './courses.component';
import { SearchBarComponent } from '../search-bar';
import { AddCourseBtnComponent } from '../add-course-btn';
import { CoursesListComponent } from '../courses-list';
import { CourseItemComponent } from '../course-item';
import { SharedModule } from '../../../shared';
import { OrderByPipe } from '../../pipes';
import { DateStatusDirective } from '../../directives';
import { CoursesService } from '../../services';
import { AppState } from '../../../core/store';
import { deleteCourse, getCoursesData, getCoursesLoading } from '../../store';

class MockCoursesService {
  onFiltersChange(filters) {}
}

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: CoursesService;

  let mockStore: MockStore<AppState>;
  let mockGetCoursesLoadingSelector: MemoizedSelector<AppState, boolean>;
  let mockGetCoursesDataSelector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        SearchBarComponent,
        AddCourseBtnComponent,
        CoursesListComponent,
        CourseItemComponent,

        OrderByPipe,
        DateStatusDirective,
        MockDirective(SwalDirective),
      ],
      imports: [
        FormsModule,
        RouterTestingModule,

        SharedModule
      ],
      providers: [{
        provide: CoursesService,
        useClass: MockCoursesService
      }, provideMockStore()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);

    mockStore = TestBed.get(Store);
    mockGetCoursesLoadingSelector = mockStore.overrideSelector(getCoursesLoading, true);
    mockGetCoursesDataSelector = mockStore.overrideSelector(getCoursesData as any, []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses$', () => {
    component.ngOnInit();
    expect(component.courses$).toBeDefined();
  });

  it('should dispatch deleteCourse with id after call onDeleteCourse()', () => {
    const mockStoreSpy = spyOn(mockStore, 'dispatch');
    const id = 1;

    component.onDeleteCourse(id);

    expect(mockStoreSpy).toHaveBeenCalledWith(deleteCourse({id}));
  });

  it('should be called twice, after each call', () => {
    const onChangeFiltersSpy = spyOn(component, 'onChangeFilters');

    component.onLoadMore();
    component.onPreviousPage();

    expect(onChangeFiltersSpy).toHaveBeenCalledTimes(2);
  });

  xit('should call onLoad after click on load button', () => {
    const spy = spyOn(component, 'onLoadMore');

    fixture.debugElement
      .query(By.css('.load-more-btn'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call onChangeFilters() after change search', () => {
    const onChangeFiltersSpy = spyOn(component, 'onChangeFilters');
    const query = 'Nickelodeon';

    component.onChangeSearch(query);

    expect(onChangeFiltersSpy).toHaveBeenCalledWith( {textFragment: query});
  });

  it('should change sort parameter and reset start', () => {
    const onChangeFiltersSpy = spyOn(component, 'onChangeFilters');
    const sortByKey = 'length';

    component.onSelectSortBy(sortByKey);

    expect(onChangeFiltersSpy).toHaveBeenCalledWith({ sort: sortByKey, start: 0 });
  });

  it('should call service onFiltersChange', () => {
    const onFiltersChangeSpy = spyOn(coursesService, 'onFiltersChange');
    const sortByKey = 'length';

    component.onChangeFilters({ sort: sortByKey });

    expect(onFiltersChangeSpy).toHaveBeenCalled();
  });
});
