import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionBarComponent } from './user-action-bar.component';

describe('UserActionBarComponent', () => {
  let component: UserActionBarComponent;
  let fixture: ComponentFixture<UserActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call console.log after logout', () => {
    const spy = spyOn(console, 'log');
    component.logout();

    expect(spy).toHaveBeenCalled();
  });
});
