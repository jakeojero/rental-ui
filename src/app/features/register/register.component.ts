import { LoginService } from './../login/login.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterUser } from '../../core/shared/models/RegisterUser';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {XenosError} from '../../core/shared/models/XenosError';
import {AlertService} from '../alert/alert.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: XenosError;
  registerUser: RegisterUser;
  registerForm: FormGroup;
  passwordPattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private alert: AlertService,
    private spinner: SpinnerService) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // TODO: Generalize the validator into a shared helper component and make calls to that.
  getEmailError() {
    return this.registerForm.get('email').hasError('required') ? 'Required' :
      this.registerForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }
  getPasswordError() {
    return this.registerForm.get('password').hasError('required') ? 'Required' :
      this.registerForm.get('password').hasError('pattern') ? 'Must contain letters and numbers' :
        this.registerForm.get('password').hasError('minlength') ? 'Must contain at least 8 characters' :
          '';
  }
  getUsernameError() {
    return this.registerForm.get('username').hasError('required') ? 'Required' :
      this.registerForm.get('username').hasError('minlength') ? 'Must contain at least 5 characters' :
        '';
  }

  ngOnInit() {

  }

  submitRegistration(): void {
    this.spinner.spin();
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.registerUser = new RegisterUser(
        this.registerForm.get('username').value,
        this.registerForm.get('password').value,
        this.registerForm.get('email').value
      );

      this.registerService.registerUser(this.registerUser)
        .subscribe(
          (res) => this.onSaveComplete(res),
          (error: HttpErrorResponse) => this.handleError(error)
        );
    }
  }

  onSaveComplete(res): void {
    this.spinner.hide();
    this.registerForm.reset();
    this.alert.info('Successfully registered. Please Log in', 5000, true);
    this.router.navigate(['login']);
  }

  handleError(response: HttpErrorResponse) {
    this.spinner.hide();
    // handles an error and casts the message to a xenos error
    const error = <XenosError>response.error;
    this.errorMessage = error;
  }
}
