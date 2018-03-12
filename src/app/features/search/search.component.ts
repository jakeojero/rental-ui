import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchString: string;
  @Output() search = new EventEmitter<string>();
  @Output() searchBy = new EventEmitter<any>();

  filters = [
    {value: 'rooms' , view: 'Rooms'},
    {value: 'city' , view: 'City'},
    {value: 'province' , view: 'Province'},
    {value: 'id' , view: 'Id'},
    {value: 'title' , view: 'Title'},
    {value: 'price' , view: 'Price'},
  ];

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
  }

  ngOnInit() {
  }

  searchChange() {
    this.search.emit(this.searchString);
  }

  searchByChange(event) {
    this.searchBy.emit(event.value);
  }
}
