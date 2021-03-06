import {
  Component
} from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from './core';

@Component({
  selector: 'cs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth$: Observable<boolean> = this.authService.isAuth$();

  constructor(
    private authService: AuthService,
  ) {}
}
