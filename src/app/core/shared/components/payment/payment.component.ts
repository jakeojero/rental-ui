import { Observable } from 'rxjs/Observable';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AlertService } from './../../../../features/alert/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NavbarService } from './../../../../features/navbar/navbar.service';
import { SpinnerService } from './../../../../features/spinner/spinner.service';
import { Property } from '../../models/Property';
import { EditpropertyService } from '../../../../features/editproperty/editproperty.service';
import { User } from '../../models/User';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  purchase: string;
  price: number;
  property: Property;
  window;
  user: User;
  stripe: any;
  elements: any;
  constructor(private http: HttpClient,
    private alert: AlertService,
    private router: Router,
    private navbar: NavbarService,
    private spinner: SpinnerService,
    private route: ActivatedRoute,
    private propertyService: EditpropertyService) {

    this.route.queryParams.subscribe(params => {
      this.purchase = params['purchase'];
    });

    this.navbar.getUser().subscribe(user => {
      this.user = user;
    });

    // TODO: Find out how to get property
    // this.propertyService.getProperty(this.user.username).subscribe(property => {
    //   this.property = property;
    // });
  }

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
    const card = elements.create('card', { style: style });

    card.addEventListener('change', ({ error }) => {
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

      const { token, error } = await stripe.createToken(card);

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

  chargeCard(token) {
    this.spinner.spin();
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`,
      'token': `${token.id}`,
      'amount': `${this.price}`
    });

    if (this.purchase === 'premium') {
      this.http.post('/payment/charge', {}, { headers: headers })
        .subscribe(resp => this.onPaymentComplete(resp),
          err => {
            this.spinner.hide();
            if (err.error.message) {
              this.alert.error(err.error.message, 5000, false);
            } else {
              this.alert.error('An error occured', 5000, false);
            }

          });
    } else if (this.purchase === 'promoted') { // TODO: Get API endpoint for promoted proeprties
      this.http.post('/payment/charge', {}, { headers: headers })
        .subscribe(resp => this.onPaymentComplete(resp),
          err => {
            this.spinner.hide();
            if (err.error.message) {
              this.alert.error(err.error.message, 5000, false);
            } else {
              this.alert.error('An error occured', 5000, false);
            }

          });
    }
  }

  onPaymentComplete(res) {
    this.spinner.hide();
    this.alert.info(res.outcome.sellerMessage, 5000, true);
    if (this.purchase === 'premium') {
      this.navbar.addPremiumToUser(true);
    } else if (this.purchase === 'promoted') {
      this.property.isPromoted = true;
      this.propertyService.updateProperty(this.property, this.user.username);
    }
    this.router.navigate(['/home']);
  }

}
