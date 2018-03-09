import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterUser } from '../../core/shared/models/RegisterUser';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  registerUser: RegisterUser;
  registerForm: FormGroup;
  passwordPattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
                           private registerService: RegisterService) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

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
    if (this.registerForm.dirty && this.registerForm.valid) {

      // Is there a quicker way to map this?
      this.registerUser.username = this.registerForm.get('username').value();
      this.registerUser.password = this.registerForm.get('password').value();
      this.registerUser.email = this.registerForm.get('email').value();

      this.registerService.registerUser(this.registerUser)
      .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
      );
    }
  }

  onSaveComplete(): void {
    this.registerForm.reset();
    // route to home page
  }
}
