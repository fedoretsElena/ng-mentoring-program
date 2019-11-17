import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { User, AuthService } from '../../../core';

@Component({
  selector: 'cs-user-action-bar',
  templateUrl: './user-action-bar.component.html',
  styleUrls: ['./user-action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionBarComponent implements OnInit {
  user$: Observable<User>;
  isAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user$ = this.authService.getUserInfo$;
    this.isAuth$ = this.authService.isAuth$();
  }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout()
      .subscribe(() => {
          console.log('Logout.');
          this.router.navigate(['auth/login']);
        }
      );
  }
}
