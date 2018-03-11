import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() filteredSearch = new EventEmitter();
  searchForm: FormGroup;
  filters = [
    'Address',
    'City',
    'Province',
    'Country',
    'Postal Code',
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

  filterSearch() {
    this.filteredSearch.emit('filter', this.searchForm.get('searchFilter').value, this.searchForm.get('searchTerm').value);
    // Send this up to parent propertylist to refresh properties with filter
  }
}
