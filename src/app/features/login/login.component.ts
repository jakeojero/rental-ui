import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordPattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
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

}
