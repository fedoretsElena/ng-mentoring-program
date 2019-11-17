import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = {
    email: 'test@gmail.com',
    password: 'qazxsw1!'
  };

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit($event): void {
    $event.preventDefault();

    this.authService.login(this.loginForm)
      .subscribe(() => {
        console.log('Logged in successfully.');
        this.router.navigate(['/courses']);
      });
  }
}
