import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesComponent } from './courses.component';
import { SearchBarComponent } from '../search-bar';
import { AddCourseBtnComponent } from '../add-course-btn';
import { CoursesListComponent } from '../courses-list';
import { CourseItemComponent } from '../course-item';
import { SharedModule } from '../../../shared';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        SearchBarComponent,
        AddCourseBtnComponent,
        CoursesListComponent,
        CourseItemComponent
      ],
      imports: [
        FormsModule,

        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses$', () => {
    component.ngOnInit();
    expect(component.courses$).toBeDefined();
  });

  it('should log courseId after call onDeleteCourse method', () => {
    const consoleLogSpy = spyOn(console, 'log');
    const id = 1;

    component.onDeleteCourse(id);

    expect(consoleLogSpy).toHaveBeenCalledWith('This course should be deleted: ', id);
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
});
