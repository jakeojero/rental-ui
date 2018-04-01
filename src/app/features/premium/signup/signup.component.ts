import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertService } from './../../alert/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '../../navbar/navbar.service';
import { SpinnerService } from '../../spinner/spinner.service';
declare var Stripe: any;

function _window(): any {
  // return the global native browser window object
  return window;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  window;
  user;
  stripe: any;
  elements: any;
  constructor(private http: HttpClient,
              private alert: AlertService,
              private router: Router,
              private navbar: NavbarService,
              private spinner: SpinnerService) { }

  ngOnInit() {
    const window = _window();

    const stripe = window.Stripe('pk_test_tDf6Ey44YHJm6X6Ftw2ef4Zs');
    const elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    const card = elements.create('card', {style: style});

    card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Create a token or display an error when the form is submitted.
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {token, error} = await stripe.createToken(card);

      if (error) {
        // Inform the customer that there was an error.
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
      } else {
        // Send the token to your server.
        this.chargeCard(token);
      }
    });


  }

  ngOnDestroy() {
  }

  chargeCard(token) {
    this.spinner.spin();
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`,
      'token': `${token.id}`,
      'amount': `${4.99}`
    });

    this.http.post('/payment/charge', {}, {headers: headers})
      .subscribe(resp => this.onPaymentComplete(resp),
      err => {
        this.spinner.hide();
        if(err.error.message) {
          this.alert.error(err.error.message, 5000, false);
        }
        else {
          this.alert.error('An error occured', 5000, false);
        }

      });
  }

  onPaymentComplete(res) {
    this.spinner.hide();
    this.alert.info(res.outcome.sellerMessage, 5000, true);
    this.navbar.addPremiumToUser(true);
    this.router.navigate(['/home']);
  }

}
