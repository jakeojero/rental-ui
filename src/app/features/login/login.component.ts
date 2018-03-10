import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginUser } from '../../core/shared/models/LoginUser';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {XenosError} from '../../core/shared/models/XenosError';

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
    private router: Router) {
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
          (error: HttpErrorResponse) => this.handleError(error)
        );
    }
  }

  onSaveComplete(res): void {
    window.localStorage.setItem('token', res.headers.get('X-AUTH-TOKEN'));
    // save user name and roles here which will dictate what you display on a screen
    this.loginForm.reset();
    this.router.navigate(['home']);
  }

  handleError(response: HttpErrorResponse) {
    const error = <XenosError>response.error;
    // do error stuff
    // ex alertService.error(error, '5sec') // i can help with this later
  }
}
