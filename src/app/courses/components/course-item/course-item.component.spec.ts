import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { MockDirective } from 'ng-mocks';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CourseItemComponent } from './course-item.component';
import { courses } from '../../mocks';
import { Course } from '../../entitites';
import { SharedModule } from '../../../shared';
import { DateStatusDirective } from '../../directives';

class FakeTranslateLoader implements TranslateLoader {
  public getTranslation(_: any) {
    return of();
  }
}

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        MockDirective(SwalDirective),

        DateStatusDirective
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader}
        }),

        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = new Course({
      id: 1,
      duration: 123,
      isTopRated: false,
      title: 'Test course',
      creationDate: new Date(),
      description: 'Once upon a time..',
      authors: []
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize @Input course', () => {
    component.course = new Course(courses[0]);
    fixture.detectChanges();

    expect(component.course).toBeDefined();
  });

  it('should raise own id after call onDelete method', (done) => {
    let selectedId: number;
    component.delete.subscribe((id: number) => {
      selectedId = id;

      done();
    });

    component.onDelete();

    expect(selectedId).toBe(component.course.id);
  });
});
