import { Component, OnInit } from '@angular/core';
import { Property } from '../../core/shared/models/Property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  property: Property;
  constructor() { }

  ngOnInit() {
  }

}
