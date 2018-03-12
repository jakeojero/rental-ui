import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editproperty',
  templateUrl: './editproperty.component.html',
  styleUrls: ['./editproperty.component.scss']
})
export class EditpropertyComponent implements OnInit {

  propertyForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
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

  }
}
