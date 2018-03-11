import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // @Input() properties
  searchForm: FormGroup;
  filters = [
    {value: 'rooms' , view: '# of Rooms'},
    {value: 'city' , view: 'City'},
    {value: 'province' , view: 'Province'},
    {value: 'id' , view: 'Property Id'},
    {value: 'title' , view: 'Title'},
    {value: 'price' , view: 'Price'},
  ];

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.searchForm = fb.group({
      searchFilter: ['', Validators.required],
      searchTerm: ['', Validators.required]
    });
  }

  getSearchFilterError() {
    return this.searchForm.get('searchFilter').hasError('required') ? 'Required' : '';
  }
  getSearchTermError() {
    return this.searchForm.get('searchTerm').hasError('required') ? 'Required' : '';
  }

  ngOnInit() {
  }
}
