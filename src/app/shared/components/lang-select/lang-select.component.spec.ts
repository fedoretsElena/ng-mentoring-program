import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { LangSelectComponent } from './lang-select.component';
import { SelectComponent } from '../select';

describe('LangSelectComponent', () => {
  let component: LangSelectComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<LangSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangSelectComponent, SelectComponent ],
      providers: [{
        provide: TranslateService,
        useValue: { instant: () => '', setDefaultLang(lang) {}}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSelectComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call translateService after select', () => {
    const spy = spyOn(translateService, 'setDefaultLang');
    component.onSelect('en');

    expect(spy).toHaveBeenCalledWith('en');
  });
});
