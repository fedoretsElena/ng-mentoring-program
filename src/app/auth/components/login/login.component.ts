import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      login: [null, [
        Validators.required
      ]],
      password: [null, [
        Validators.required
      ]]
    });
  }

  onSubmit(event, value: { login: string, password: string }): void {
    event.preventDefault();

    this.authService.login(value).subscribe();
  }
}
