import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SelectOption } from '../select';

@Component({
  selector: 'cs-lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.scss']
})
export class LangSelectComponent implements OnInit {
  options: SelectOption[];

  private readonly availableLanguages = ['en', 'ru'];

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.options = this.availableLanguages.map((lang: string) => ({ label: lang.toUpperCase(), value: lang }));
  }

  onSelect(value: string): void {
    this.translateService.setDefaultLang(value);
  }
}
