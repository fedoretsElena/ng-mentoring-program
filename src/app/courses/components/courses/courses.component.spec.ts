import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { skip } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MockDirective } from 'ng-mocks';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';

import { CoursesComponent } from './courses.component';
import { SearchBarComponent } from '../search-bar';
import { AddCourseBtnComponent } from '../add-course-btn';
import { CoursesListComponent } from '../courses-list';
import { CourseItemComponent } from '../course-item';
import { SharedModule } from '../../../shared';
import { OrderByPipe } from '../../pipes';
import { DateStatusDirective } from '../../directives';
import { CoursesService } from '../../services';
import { courses } from '../../mocks';
import { Course } from '../../entitites';

class MockCoursesService {
  removeItem(id: number): Observable<null> {
    return of(null);
  }

  getList() {
    return of(courses.map(c => new Course(c)));
  }
}

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: CoursesService;

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

        SharedModule
      ],
      providers: [{
        provide: CoursesService,
        useClass: MockCoursesService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses$', () => {
    component.ngOnInit();
    expect(component.courses$).toBeDefined();
  });

  it('should call removeItem(id) of coursesService after call onDeleteCourse()', () => {
    const coursesServiceSpy = spyOn(coursesService, 'removeItem').and.returnValue(of(null));
    const id = 1;

    component.onDeleteCourse(id);

    expect(coursesServiceSpy).toHaveBeenCalledWith(id);
  });

  it('should log msg after call onLoad method', () => {
    const consoleLogSpy = spyOn(console, 'log');

    component.onLoadMore();

    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should call onLoad after click on load button', () => {
    const spy = spyOn(component, 'onLoadMore');

    fixture.debugElement
      .query(By.css('.load-more-btn'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should filter courses list when search changed', (done) => {
    const q = 'Angular';

    component.courses$
      .pipe(
        skip(1)
      )
      .subscribe((res) => {
        expect(res[0].title).toContain(q);

        done();
      });

    component.onChangeSearch(q);
  });
});
