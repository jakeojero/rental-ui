import { SpinnerService } from './../../spinner/spinner.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../../alert/alert.service';
import { PasswordService } from './../password.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
              private passwordService: PasswordService,
              private alert: AlertService,
              private router: Router,
              private spinner: SpinnerService) {

    this.resetPasswordForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
    });

  }

  ngOnInit() {
  }

  getUsernameError() {
    return this.resetPasswordForm.get('username').hasError('required') ? 'Required' :
      this.resetPasswordForm.get('username').hasError('minlength') ? 'Must contain at least 5 characters' :
        '';
  }

  submitResetRequest() {
    if (this.resetPasswordForm.dirty && this.resetPasswordForm.valid) {
      const username = this.resetPasswordForm.get('username').value;
      this.spinner.spin();
      this.passwordService.requestPasswordReset(username)
          .subscribe(
            (response) => {
              if (response.ok) {
                this.alert.info('We sent an email to the email listed on the account.', 10000, true);
                this.router.navigate(['login']);
                this.spinner.hide();
              }
            },
            (err: HttpErrorResponse) => {
              if (err.status === 404) {
                this.spinner.hide();
                this.alert.error(`We couldn't find ${username} in our system.`, 5000, false);
              }
            }
          );
    }
  }


}
