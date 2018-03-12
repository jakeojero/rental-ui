import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Property } from '../../core/shared/models/Property';
import { Router } from '@angular/router';
import { EditpropertyService } from './editproperty.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { XenosError } from '../../core/shared/models/XenosError';
import { AlertService } from '../alert/alert.service';
import { PropertyDetails } from '../../core/shared/models/PropertyDetails';
import { Locator } from '../../core/shared/models/Locator';


@Component({
  selector: 'app-editproperty',
  templateUrl: './editproperty.component.html',
  styleUrls: ['./editproperty.component.scss']
})
export class EditpropertyComponent implements OnInit {

  property: Property;
  // propertyDetails: PropertyDetails;
  locator: Locator;
  propertyForm: FormGroup;
  errorMessage: XenosError;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private editpropertyservice: EditpropertyService,
    private router: Router,
    private alert: AlertService) {

    this.propertyForm = fb.group({
      title: ['', Validators.required],
      rooms: ['', Validators.required],
      price: ['', Validators.required],
      notes: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      tenants: ['', Validators.required],
      monthlyRate: ['', Validators.required],
      expenses: ['', Validators.required],
    });
  }

  // Sorry Jake, haven't abstracted the validator yet, this is sloppy I know
  getTitleError() {
    return this.propertyForm.get('title').hasError('required') ? 'Required' : '';
  }
  getRoomsError() {
    return this.propertyForm.get('rooms').hasError('required') ? 'Required' : '';
  }
  getPriceError() {
    return this.propertyForm.get('price').hasError('required') ? 'Required' : '';
  }
  getNotesError() {
    return this.propertyForm.get('notes').hasError('required') ? 'Required' : '';
  }
  getAddressError() {
    return this.propertyForm.get('address').hasError('required') ? 'Required' : '';
  }
  getCityError() {
    return this.propertyForm.get('city').hasError('required') ? 'Required' : '';
  }
  getProvinceError() {
    return this.propertyForm.get('province').hasError('required') ? 'Required' : '';
  }
  getCountryError() {
    return this.propertyForm.get('country').hasError('required') ? 'Required' : '';
  }
  getPostalCodeError() {
    return this.propertyForm.get('postalCode').hasError('required') ? 'Required' : '';
  }
  getTenantsError() {
    return this.propertyForm.get('tenants').hasError('required') ? 'Required' : '';
  }
  getRateError() {
    return this.propertyForm.get('monthlyRate').hasError('required') ? 'Required' : '';
  }
  getExpensesError() {
    return this.propertyForm.get('expenses').hasError('required') ? 'Required' : '';
  }
  ngOnInit() {
  }

  submitProperty() {
    if (this.propertyForm.dirty && this.propertyForm.valid) {
      this.property = new Property();
      // this.property.details = new PropertyDetails();
      this.property.locator = new Locator();
      this.property.title = this.propertyForm.get('title').value;
      this.property.rooms = +this.propertyForm.get('rooms').value;
      this.property.price = +this.propertyForm.get('price').value;
      this.property.notes.push(this.propertyForm.get('notes').value);
      // this.property.details.amountOfTenants = this.propertyForm.get('tenants').value;
      // this.property.details.expenses = this.propertyForm.get('expenses').value;
      // this.property.details.monthlyRate = this.propertyForm.get('monthlyRate').value;
      this.property.locator.address = this.propertyForm.get('address').value;
      this.property.locator.city = this.propertyForm.get('city').value;
      this.property.locator.province = this.propertyForm.get('province').value;
      this.property.locator.country = this.propertyForm.get('country').value;
      this.property.locator.postalCode = this.propertyForm.get('postalCode').value;

      this.editpropertyservice.submitProperty(this.property, window.localStorage.getItem('username')).subscribe(
        (res) => this.onSubmitComplete(res),
        (error: HttpErrorResponse) => this.handleError(error)
      );
    }
  }
  onSubmitComplete(res): void {
    this.propertyForm.reset();
    this.alert.info('Listing Submitted!', 5000, true);
    this.router.navigate(['home']);
  }

  handleError(response: HttpErrorResponse) {

    // handles an error and casts the message to a xenos error
    const error = <XenosError>response.error;
    this.alert.error(error.message, 5000, false);

  }
}
