import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginUser } from '../../core/shared/models/LoginUser';
import { LoginService } from './login.service';

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
                           private loginService: LoginService) {
    this.loginForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
    });
  }

  getPasswordError() {
    return this.loginForm.get('password').hasError('required') ? 'Required' :
      this.loginForm.get('password').hasError('pattern') ? 'Must contain letters and numbers' :
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
        this.loginForm.get('username').value(),
        this.loginForm.get('password').value()
      );

      this.loginService.loginUser(this.loginUser)
      .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
      );
    }
  }

  onSaveComplete(): void {
    this.loginForm.reset();
    // route to home page
  }

}
