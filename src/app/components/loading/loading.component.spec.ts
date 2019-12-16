import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoaderService } from '../../core/services';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let loaderService: LoaderService;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      providers: [
        LoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.get(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if loading state active', (done) => {
    loaderService.onShow(true);

    component.loaderState$.subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should call return false if loading state not active', (done) => {
    loaderService.onShow(false);

    component.loaderState$.subscribe((res) => {
      expect(res).toBeFalsy();
      done();
    });
  });
});
