import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './core';

@Component({
  selector: 'cs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuth$ = this.authService.isAuth$();

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
    }
  }
}
