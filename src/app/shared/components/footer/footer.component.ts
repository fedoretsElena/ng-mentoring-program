import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  constructor() { }
}
