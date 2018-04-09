import { SpinnerService } from './../../spinner/spinner.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../password.service';
import { AlertService } from '../../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  passwordPattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  token: string;
  userid: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
              private passwordService: PasswordService,
              private alert: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: SpinnerService) {

                this.changePasswordForm = fb.group({
                  password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
                  password2: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
                });

                this.route.params.subscribe(param => {
                  this.token = param['token'];
                  this.userid = param['user'];
                });
               }

  ngOnInit() {
  }

  getPassword1Error() {
    return this.changePasswordForm.get('password1').hasError('required') ? 'Required' :
      this.changePasswordForm.get('password1').hasError('pattern') ? 'Must contain letters and numbers' :
        this.changePasswordForm.get('password1').hasError('minlength') ? 'Must contain at least 8 characters' :
          '';
  }

  getPassword2Error() {
    return this.changePasswordForm.get('password2').hasError('required') ? 'Required' :
    this.changePasswordForm.get('password2').hasError('pattern') ? 'Must contain letters and numbers' :
      this.changePasswordForm.get('password2').hasError('minlength') ? 'Must contain at least 8 characters' :
        '';
  }

  submitChangeRequest() {

    this.spinner.spin();
    this.passwordService.validateToken(this.token).subscribe(
      response => {
        this.spinner.hide();
        if (this.changePasswordForm.dirty && this.changePasswordForm.valid) {
          const p1 = this.changePasswordForm.get('password1').value;
          const p2 = this.changePasswordForm.get('password2').value;

          if (p1 === p2) {
            this.passwordService.updatePassword(this.userid, btoa(p1))
                                .subscribe(res => this.handleSuccess(res), err => this.handleError(err));
          } else {
            this.alert.error('Passwords do not match', 5000, false);
          }
        }
      },
      err => {
        this.spinner.hide();
        this.alert.error(err.error.message !== undefined ? err.error.message : 'Invalid Token', 5000, false);
      }
    );

  }

  handleSuccess(response): void {
    this.spinner.hide();
    this.alert.info('Password has been changed!', 5000, true);
    this.router.navigate(['/login']);
  }

  handleError(err): void {
    this.spinner.hide();
    this.alert.error('Something went wrong!', 5000, true);
  }

}
