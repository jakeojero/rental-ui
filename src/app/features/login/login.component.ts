import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginUser } from '../../core/shared/models/LoginUser';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { XenosError } from '../../core/shared/models/XenosError';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginUser: LoginUser;
  loginForm: FormGroup;
  passwordPattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private alert: AlertService) {
    this.loginForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getPasswordError() {
    return this.loginForm.get('password').hasError('required') ? 'Required' :
      // this.loginForm.get('password').hasError('pattern') ? 'Must contain letters and numbers' :
      this.loginForm.get('password').hasError('minlength') ? 'Must contain at least 8 characters' :
        '';
  }
  getUsernameError() {
    return this.loginForm.get('username').hasError('required') ? 'Required' :
      this.loginForm.get('username').hasError('minlength') ? 'Must contain at least 5 characters' :
        '';
  }
  ngOnInit() {
  }

  submitLogin(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loginUser = new LoginUser(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );

      this.loginService.loginUser(this.loginUser)
        .subscribe(
          (res) => this.onSaveComplete(res),
          (err: HttpErrorResponse) => this.handleError(err)
        );
    }
  }

  onSaveComplete(res): void {
    this.alert.info('Login Successful', 5000, true);
    window.localStorage.setItem('token', res.headers.get('X-AUTH-TOKEN'));
    window.localStorage.setItem('username', res.body.username);
    window.localStorage.setItem('email', res.body.email);
    // save user name and roles here which will dictate what you display on a screen
    this.loginForm.reset();
    this.router.navigate(['home']);
  }

  handleError(response: HttpErrorResponse) {
    if (response.status === 400) {
      this.alert.error('Invalid Credentials', 5000, false);
    }
    if (response.status === 404) {
      this.alert.error('User could not be found', 5000, false);
    }
  }
}

